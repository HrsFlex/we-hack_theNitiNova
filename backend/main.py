import streamlit as st
import requests
from bs4 import BeautifulSoup
import json
import pandas as pd
from llama_cpp import Llama
import nltk
from nltk.tokenize import word_tokenize
import re
from typing import List, Dict
import logging
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DataIngestion:
    """Bronze tier: Data ingestion from APIs and web scraping"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def fetch_from_indiankanoon(self, query: str) -> Dict:
        """Fetch data from Indian Kanoon API"""
        url = "https://api.indiankanoon.org/search/"
        params = {
            "query": query,
            "page": 1
        }
        try:
            response = requests.get(url, headers=self.headers, params=params)
            return response.json()
        except Exception as e:
            logger.error(f"Error fetching from Indian Kanoon: {e}")
            return {}

    def scrape_legislative_website(self) -> List[Dict]:
        """Scrape data from legislative.gov.in"""
        url = "https://legislative.gov.in/constitution-of-india/"
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            # Add specific scraping logic based on website structure
            data = []  # Extract relevant data
            return data
        except Exception as e:
            logger.error(f"Error scraping legislative website: {e}")
            return []

    def scrape_supreme_court(self) -> List[Dict]:
        """Scrape data from Supreme Court website"""
        url = "https://www.sci.gov.in/"
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            # Add specific scraping logic
            data = []  # Extract relevant data
            return data
        except Exception as e:
            logger.error(f"Error scraping Supreme Court website: {e}")
            return []

class DataCleaning:
    """Silver tier: Remove redundancy"""
    
    @staticmethod
    def remove_duplicates(data: List[Dict]) -> List[Dict]:
        """Remove duplicate entries based on content"""
        seen = set()
        cleaned_data = []
        for item in data:
            content_hash = hash(json.dumps(item, sort_keys=True))
            if content_hash not in seen:
                seen.add(content_hash)
                cleaned_data.append(item)
        return cleaned_data

    @staticmethod
    def standardize_format(data: List[Dict]) -> List[Dict]:
        """Standardize data format"""
        standardized = []
        for item in data:
            standardized_item = {
                'title': item.get('title', '').strip(),
                'content': item.get('content', '').strip(),
                'date': item.get('date', ''),
                'source': item.get('source', ''),
                'url': item.get('url', '')
            }
            standardized.append(standardized_item)
        return standardized

class DataRefinement:
    """Gold tier: Remove unwanted attributes"""
    
    @staticmethod
    def filter_attributes(data: List[Dict]) -> List[Dict]:
        """Keep only relevant attributes"""
        relevant_keys = {'title', 'content', 'date', 'source', 'url'}
        refined_data = []
        for item in data:
            refined_item = {k: v for k, v in item.items() if k in relevant_keys}
            refined_data.append(refined_item)
        return refined_data

class LegalSearchEngine:
    """Search engine using LLAMA model"""
    
    def __init__(self, model_path: str):
        self.llm = Llama(model_path=model_path)
        nltk.download('punkt')
    
    def tokenize_text(self, text: str) -> List[str]:
        """Tokenize input text"""
        return word_tokenize(text.lower())
    
    def rank_results(self, query_tokens: List[str], documents: List[Dict]) -> List[Dict]:
        """Implement PageRank-inspired ranking algorithm"""
        ranked_results = []
        for doc in documents:
            doc_tokens = self.tokenize_text(doc['content'])
            score = self._calculate_relevance_score(query_tokens, doc_tokens)
            ranked_results.append({**doc, 'score': score})
        
        return sorted(ranked_results, key=lambda x: x['score'], reverse=True)
    
    def _calculate_relevance_score(self, query_tokens: List[str], doc_tokens: List[str]) -> float:
        """Calculate relevance score using TF-IDF inspired approach"""
        score = 0
        for token in query_tokens:
            score += doc_tokens.count(token)
        return score

def main():
    st.title("Legal Document Search Engine")
    
    # Sidebar for API configuration
    st.sidebar.header("Configuration")
    api_key = st.sidebar.text_input("Enter API Key", type="password")
    
    # Main search interface
    search_query = st.text_input("Enter your legal query")
    
    if st.button("Search") and search_query and api_key:
        try:
            # Initialize components
            ingestion = DataIngestion(api_key)
            cleaner = DataCleaning()
            refiner = DataRefinement()
            search_engine = LegalSearchEngine("path/to/llama/model.bin")
            
            # Bronze tier: Data collection
            st.info("Collecting data...")
            kanoon_data = ingestion.fetch_from_indiankanoon(search_query)
            legislative_data = ingestion.scrape_legislative_website()
            supreme_court_data = ingestion.scrape_supreme_court()
            
            combined_data = [*kanoon_data, *legislative_data, *supreme_court_data]
            
            # Silver tier: Clean data
            st.info("Cleaning data...")
            cleaned_data = cleaner.remove_duplicates(combined_data)
            cleaned_data = cleaner.standardize_format(cleaned_data)
            
            # Gold tier: Refine data
            st.info("Refining data...")
            refined_data = refiner.filter_attributes(cleaned_data)
            
            # Save to JSON
            with open('legal_database.json', 'w') as f:
                json.dump(refined_data, f)
            
            # Process search query
            st.info("Processing query...")
            query_tokens = search_engine.tokenize_text(search_query)
            
            # Search and rank results
            results = search_engine.rank_results(query_tokens, refined_data)
            
            # Display results
            st.success("Search complete!")
            for idx, result in enumerate(results[:5], 1):
                st.subheader(f"Result {idx}")
                st.write(f"Title: {result['title']}")
                st.write(f"Source: {result['source']}")
                st.write(f"Relevance Score: {result['score']:.2f}")
                with st.expander("View Content"):
                    st.write(result['content'])
                st.write("---")
                
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")
            logger.error(f"Application error: {e}")

if __name__ == "__main__":
    main()