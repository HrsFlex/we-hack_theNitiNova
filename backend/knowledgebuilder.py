import os
import base64
import io
import requests
import pdf2image
import google.generativeai as genai
import speech_recognition as sr

from youtube_transcript_api import YouTubeTranscriptApi
from PIL import Image
import streamlit as st
from streamlit_option_menu import option_menu
from streamlit_lottie import st_lottie
from fpdf import FPDF
from login import login_component
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import streamlit as st
import pandas as pd
import time





# Set up API keys from environment variables
load_dotenv()
GENAI_API_KEY = os.getenv("GENAI_API_KEY")  # Correctly fetching API key from environment
genai.configure(api_key=GENAI_API_KEY)

# Mapping of IPC sections to BNS sections
ipc_to_bns_mapping = {
    "IPC Section 468 - Limitation Period": "BNS Section 138 - Limitation Period: This section establishes the time limits within which a party must initiate legal proceedings. It is crucial for ensuring that claims are made in a timely manner, thereby promoting legal certainty and preventing the indefinite threat of litigation. The limitation period varies depending on the nature of the claim, and failure to file within this period may result in the dismissal of the case.",
    
    "IPC Section 190 - Case Management Hearings": "BNS Section 225 - Case Management Hearings: This section outlines the procedures for conducting case management hearings, which are designed to streamline the litigation process. These hearings allow the court to assess the progress of a case, set timelines for various stages of the proceedings, and address any issues that may impede the timely resolution of disputes. Effective case management is essential for reducing delays and ensuring that justice is served efficiently.",
    
    
    "IPC Section 374 - Appeals": "BNS Section 4 - Appeals: This section details the rights and procedures for appealing decisions made by lower courts. It provides a framework for parties dissatisfied with a judgment to seek a review by a higher court. The appeals process is a fundamental aspect of the judicial system, allowing for the correction of errors and the development of legal principles through judicial review.",
    
    "IPC Section 51 - Execution of Decrees": "BNS Section 2(23) - Execution of Decrees: This section governs the enforcement of court orders and decrees, ensuring that judgments are implemented effectively. It outlines the procedures for executing various types of decrees, including monetary judgments and specific performance orders. The execution process is vital for upholding the rule of law and ensuring that successful litigants receive the relief granted by the court.",
    
    "IPC Section 94 - Orders of the Court": "BNS Section 32 - Orders of the Court: This section provides the authority and procedures for issuing various types of court orders, including interim orders, injunctions, and other directives necessary for the administration of justice. Court orders play a critical role in managing the conduct of parties during litigation and ensuring compliance with legal obligations.",
    
    "IPC Section 195 - Savings Clause": "BNS Section 231 - Savings Clause: This section protects certain rights and provisions from being affected by the enactment of new legislation. It ensures that existing rights, remedies, and legal proceedings are preserved, thereby maintaining legal continuity and stability in the face of legislative changes.",
    
    "IPC Section 415 - Mediation Rules": "BNS Section 318(1) - Mediation Rules: This section sets forth the rules and procedures governing mediation as a method of dispute resolution. Mediation encourages parties to resolve their disputes amicably with the assistance of a neutral third party, promoting collaboration and reducing the burden on the court system. The rules aim to facilitate effective communication and negotiation between the parties.",
    
    "IPC Section 21 - Repeals and Savings": "BNS Section 2(28) - Repeals and Savings: This section addresses the repeal of previous laws and the preservation of certain rights and obligations that may arise from those laws. It ensures that the repeal of legislation does not adversely affect ongoing proceedings or rights that have already been established, thereby safeguarding legal interests.",
    
    "IPC Section 73 - Precedent Value": "BNS Section 11 - Precedent Value: This section discusses the importance of judicial precedents in guiding future cases. It emphasizes the principle of stare decisis, which requires courts to follow established legal principles and decisions from higher courts. The adherence to precedent promotes consistency and predictability in the law, fostering public confidence in the judicial system.",
    
    "IPC Section 63 - Transfer of cases by Commercial Courts": "BNS Section 8(1) - Transfer of cases by Commercial Courts: This section outlines the process for transferring cases to commercial courts, which are specialized courts designed to handle commercial disputes efficiently. The transfer process ensures that cases are adjudicated by judges with expertise in commercial law, thereby enhancing the quality of justice in business-related matters.",
    
    "IPC Section 204 - Electronic records": "BNS Section 241 - Electronic records: This section regulates the admissibility and management of electronic records in court proceedings. It recognizes the growing importance of digital evidence in the modern legal landscape and establishes standards for the authentication",

    "IPC Section 195 - Savings Clause": "BNS Section 231 - Savings Clause: This section protects certain rights and provisions from being affected by the enactment of new legislation. It ensures that existing rights, remedies, and legal proceedings are preserved, thereby maintaining legal continuity and stability in the face of legislative changes.",
    
    "IPC Section 415 - Mediation Rules": "BNS Section 318(1) - Mediation Rules: This section sets forth the rules and procedures governing mediation as a method of dispute resolution. Mediation encourages parties to resolve their disputes amicably with the assistance of a neutral third party, promoting collaboration and reducing the burden on the court system. The rules aim to facilitate effective communication and negotiation between the parties.",
    
    "IPC Section 21 - Repeals and Savings": "BNS Section 2(28) - Repeals and Savings: This section addresses the repeal of previous laws and the preservation of certain rights and obligations that may arise from those laws. It ensures that the repeal of legislation does not adversely affect ongoing proceedings or rights that have already been established, thereby safeguarding legal interests.",
    "IPC Section 195 - Savings Clause": "BNS Section 231 - Savings Clause: This section protects certain rights and provisions from being affected by the enactment of new legislation. It ensures that existing rights, remedies, and legal proceedings are preserved, thereby maintaining legal continuity and stability in the face of legislative changes.",
    
    "IPC Section 415 - Mediation Rules": "BNS Section 318(1) - Mediation Rules: This section sets forth the rules and procedures governing mediation as a method of dispute resolution. Mediation encourages parties to resolve their disputes amicably with the assistance of a neutral third party, promoting collaboration and reducing the burden on the court system. The rules aim to facilitate effective communication and negotiation between the parties.",
    
    "IPC Section 21 - Repeals and Savings": "BNS Section 2(28) - Repeals and Savings: This section addresses the repeal of previous laws and the preservation of certain rights and obligations that may arise from those laws. It ensures that the repeal of legislation does not adversely affect ongoing proceedings or rights that have already been established, thereby safeguarding legal interests."
}
from googletrans import Translator
ipc_sections = [
    "BNS Section 7 - Jurisdiction of Commercial Courts",
    "BNS Section 3 - Establishment of Commercial Courts",
    "BNS Section 10 - Procedure for Commercial Disputes",
    "BNS Section 12A - Pre-Institution Mediation and Settlement",
    "BNS Section 13 - Appeals from Decrees of Commercial Courts",
    "BNS Section 15 - Transfer of Pending Cases",
    "BNS Section 19 - Amendments to the CPC for Commercial Disputes",
    "BNS Section 21 - Appointment of Judges in Commercial Courts",
    "BNS Section 22 - Power to Amend Schedules",
    "BNS Section 23 - Power of the High Court to Make Rules"
]


st.set_page_config(page_title="Legal Consultant", page_icon='scales', layout="wide", initial_sidebar_state="auto", menu_items=None)

# Initialize session state
if 'login_status' not in st.session_state:
    st.session_state.login_status = False
if 'email' not in st.session_state:
    st.session_state.email = None


# Sidebar menu for login and main app features
with st.sidebar:
    if not st.session_state.login_status:
        login_successful = login_component()
        if login_successful:
            st.experimental_rerun()  # Refresh to reflect login state
    else:
        st.write(f"Logged in as: {st.session_state.email}")
        if st.button("Logout"):
            st.session_state.login_status = False
            st.session_state.email = None
            st.experimental_rerun()

    if st.session_state.login_status:
        selected = option_menu(
            menu_title="Legal Advisory🧑‍⚖️",  
            options=["Students Study Portal", "Document Analysis", "Precedent Case Analysis", "IPC to BNS Converter"],
            
            icons=["book", "balance-scale", "briefcase"],  
            menu_icon="gavel",
            default_index=0,
        )
    

# Main app logic
if st.session_state.login_status:
    def input_pdf_setup(uploaded_file):
        try:
            if uploaded_file is None:
                st.error("Please upload a file")
                return None
                
            # Convert PDF to images
            images = pdf2image.convert_from_bytes(uploaded_file.read())
            
            if not images:
                st.error("Could not extract images from PDF")
                return None
                
            # Process first page
            first_page = images[0]
            img_byte_arr = io.BytesIO()
            first_page.save(img_byte_arr, format='JPEG')
            img_byte_arr = img_byte_arr.getvalue()
            
            # Return in correct format
            return [{"mime_type": "image/jpeg", "data": base64.b64encode(img_byte_arr).decode()}]
            
        except Exception as e:
            st.error(f"Error processing PDF: {str(e)}")
            return None

    def get_gemini_response1(input, pdf_content, prompt):
        try:
            if pdf_content is None:
                st.error("No content to analyze")
                return "Please upload a valid PDF file"
                
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content([input, pdf_content[0], prompt])
            return response.text
            
        except Exception as e:
            st.error(f"Error generating response: {str(e)}")
            return f"Error analyzing document: {str(e)}"

    def get_gemini_response(question):
        model = genai.GenerativeModel('gemini-1.5-flash-8b')
        response = model.generate_content(question)
        return response.text

    def load_lottieurl(url: str):
        r = requests.get(url)
        return r.json() if r.status_code == 200 else None

    def recognize_speech_from_microphone():
        with sr.Microphone() as source:
            while is_listening:
                st.write("Listening...")
                audio = recognizer.listen(source)
                try:
                    return recognizer.recognize_google(audio)
                except sr.UnknownValueError:
                    st.error("Google Speech Recognition could not understand audio")
                except sr.RequestError as e:
                    st.error(f"Could not request results from Google Speech Recognition service; {e}")

    def get_transcript(video_url):
        video_id = video_url.split("=")[1]
        return YouTubeTranscriptApi.get_transcript(video_id)

    def pseudo_bold(text):
        return ''.join(chr(0x1D5D4 + ord(c) - ord('A')) if 'A' <= c <= 'Z' else chr(0x1D5EE + ord(c) - ord('a')) if 'a' <= c <= 'z' else c for c in text)

        

    def input_pdf_setup(uploaded_file):
        try:
            if uploaded_file is None:
                st.error("Please upload a file")
                return None
                
            # Convert PDF to images
            try:
                images = pdf2image.convert_from_bytes(uploaded_file.read())
            
                if not images:
                    st.error("Could not extract images from PDF")
                    return None
                    
                # Process first page
                first_page = images[0]
                img_byte_arr = io.BytesIO()
                first_page.save(img_byte_arr, format='JPEG')
                img_byte_arr = img_byte_arr.getvalue()
                
                # Return in correct format
                return [{"mime_type": "image/jpeg", "data": base64.b64encode(img_byte_arr).decode()}]
            
            except Exception as pdf2image_error:
                st.warning("Falling back to alternative PDF processing method...")
            
            # Fallback to PyPDF2
                try:
                    import PyPDF2
                    pdf_reader = PyPDF2.PdfReader(io.BytesIO(uploaded_file.read()))
                    text_content = ""
                    
                    if len(pdf_reader.pages) > 0:
                        text_content = pdf_reader.pages[0].extract_text()
                        
                    if text_content:
                        return [{"mime_type": "text/plain", "data": text_content}]
                    else:
                        st.error("Could not extract text from PDF")
                        return None
                    
                except Exception as pypdf2_error:
                    raise Exception(f"Both PDF processing methods failed. Original error: {pdf2image_error}. Fallback error: {pypdf2_error}")
                
        except Exception as e:
            st.error(f"Error processing PDF: {str(e)}")
            return None
        
    if selected == "Students Study Portal":
        link = "https://lottie.host/76509b4e-81b1-4877-9974-1fa506b294b1/ja7bfvhaEb.json"
        l = load_lottieurl(link)
        col1, col2 = st.columns([1, 9])
        with col1:
            st.lottie(l, height=100, width=100)
        with col2:
            st.header(f":scales: For Law Students", divider='rainbow')

        with st.form(key='survey_form'):
            col1, col2 = st.columns(2)

            with col1:
                text_stack_placeholder = pseudo_bold("Select BNS Sections")
                selected_sections = st.multiselect("BNS Sections", ipc_sections, [], placeholder="Choose BNS sections")
                
            with col2:
                end_goal = st.multiselect("What is your Goal?", ["Learn Legal Concepts", "Prepare for Exam", "Practical Application"], [], placeholder="Choose your goal")
                difficulty = st.radio("At what level do you want to learn?", ("Beginner😃🟢", "Intermediate🙂🟡", "Advanced😎🔴"))

            submit_button = st.form_submit_button(label='Submit')

        if submit_button:
            with st.spinner("Analyzing..."):
                s = f"As a commercial court lawyer of India, you've selected the following sections to focus on: {selected_sections} BNS stands for Bharatiya Nyaya Sanhita. Your objective is to {end_goal} with a focus at the {difficulty} level. Based on these inputs, I will guide you through the relevant legal principles, case precedents, and practical applications like Previous cases and dates with sources. This information will help you effectively navigate through the complexities of commercial law and strengthen your preparation for resolving disputes in a commercial court setting. Also Provide some live links of legal documents and references."
                response = get_gemini_response(s)
                st.write(response)
                st.download_button(
                label="Download Analysis Result",
                data=response,
                file_name="analysis_result.txt",
                mime="text/plain",
            )

                

    # Main app logic
# ----------------------------------------PRECEDENT CASE ANALYSIS-----------------------------------
    if selected == "Precedent Case Analyzer":
        # Load the dataset
        @st.cache_data
        def load_data():
                try:
                    df = pd.read_excel(r'D:\aiwaqeelMultilingual\Data\MILPaC\MILPaC_IP_dataset.xlsx')
                    df = pd.read_excel(r'D:\aiwaqeelMultilingual\Data\MILPaC\MILPaC_CCI_dataset.xlsx')
                    df = pd.read_excel(r'D:\aiwaqeelMultilingual\Data\MILPaC\MILPaC_Acts_dataset.xlsx')
                    return df
                except Exception as e:
                    st.error(f"Error loading data: {e}")
                    return pd.DataFrame()

        # Load the data
        data = load_data()

        if not data.empty:
            # Select language
            languages = data['tgt_lang'].unique()
            selected_language = st.selectbox("Select Language", languages)

            # Filter the data based on the selected language
            filtered_data = data[data['tgt_lang'] == selected_language]

            # Display the content
            if not filtered_data.empty:
                for index, row in filtered_data.iterrows():
                    st.subheader(row['src_lang'] + ": " + row['src'])
                    st.write(row['tgt'])
            else:
                st.write("No data available for the selected language.")
        else:
            st.write("No data loaded.")
        # Advanced Prompt Engineering
        languages = {
            "English": "en",
            "Hindi": "hi",
            "Bengali": "bn",
            "Marathi": "mr",
            "Punjabi": "pa",
            "Gujarati": "gu",
            "Oriya": "or"
        }

        # Dropdown for language selection
        selected_language = st.selectbox(
            "Select Language",
            list(languages.keys())
        )
        advanced_prompt = f"""
        As a highly specialized indian legal research assistant, provide a comprehensive analysis for indian legal documents:
        if target language is of {selected_language} then convert the following query into {selected_language}:

        Context: {analysis_type}
        Query: {question}

        Detailed Analysis Requirements:
        1. Provide a structured breakdown of legal principles
        2. Cite relevant case laws and their significance
        3. Explain judicial reasoning and interpretations
        4. Highlight potential legal implications
        5. Suggest potential strategies or considerations
        6. Include references to specific legal provisions

        Approach the analysis with:
        - Objectivity
        - Academic rigor
        - Comprehensive legal perspective
        """

        # Analysis Button
        if st.button("Generate Legal Analysis"):
            with st.spinner("Conducting Legal Research..."):
                try:
                    # Use Gemini for Advanced Legal Analysis
                    
                    # Display Original Analysis
                    st.markdown("### 📜 Legal Analysis Report (Original)")
                    # st.write(legal_analysis)

                    # Suggest Further Reading
                    st.markdown("### 📚 Suggested Further Reading")
                    further_reading = get_gemini_response(
                        f"Suggest 3-4 academic papers or case laws related to: {question}"
                    )
                    st.success(further_reading)
                
                    
                except Exception as e:
                    st.error(f"Error in Legal Analysis: {e}")
        
        # Citation and Disclaimer
        st.markdown("""
        ---
        🔔 **Disclaimer:** 
        - This is an AI-assisted legal research tool
        - Not a substitute for professional legal advice
        - Always consult a qualified legal professional
        """)

    

    if selected == "Document Analysis":
        link = "https://lottie.host/364beff7-b5bc-459e-ac28-d26cfa0dfece/FLsJPwNGdK.json"
        l = load_lottieurl(link)
        
        col1, col2 = st.columns([2, 9])
        with col1:
            st.lottie(l, height=150, width=150)
        with col2:
            st.header(f":scales: Document Analysis", divider='rainbow')

        with st.form(key='issue_form'):
            pdf_file = st.file_uploader("Upload Legal Document (PDF)", type=["pdf"])
            submit_button = st.form_submit_button(label='Analyze')

        if submit_button:
            with st.spinner("Analyzing..."):
                if pdf_file:
                    try:
                        # Add progress tracking
                        progress_bar = st.progress(0)
                        
                        # Process PDF
                        progress_bar.progress(30)
                        pdf_content = input_pdf_setup(pdf_file)
                        
                        if pdf_content is not None:
                            # Generate response
                            progress_bar.progress(60)
                            s = get_gemini_response1(
                                "Analyze the context of Court cases also provide previous cases like it with links and provide reference.",
                                pdf_content,
                                "Provide insights and suggestions but not be biased. also try to provide references of previous cases and other information related to it."
                            )
                            
                            progress_bar.progress(100)
                            st.write(s)
                            st.download_button(
                                label="Download Analysis Result",
                                data=s,
                                file_name="document_analysis_result.txt",
                                mime="text/plain",
                            )


                            # Display results
                        else:
                            st.error("Failed to process the PDF. Please try again with a different file.")
                            
                    except Exception as e:
                        st.error(f"An error occurred: {str(e)}")
                    finally:
                        if 'progress_bar' in locals():
                            progress_bar.empty()
                else:
                    st.error("Please upload a PDF file")


    if selected == "Precedent Case Analysis":
        link = "https://lottie.host/299688b5-e6b2-48ad-b2e9-2fa14b1fb117/TXqg2APXpL.json"
        l = load_lottieurl(link)
        
        # Lottie Animation and Header
        col1, col2 = st.columns([1, 9])
        with col1:
            st.lottie(l, height=100, width=100)
        with col2:
            st.header(f":scales: Precedent Case Analysis 🧑‍⚖️ ", divider='rainbow')
        



        analysis_type = st.radio(
            "Choose Analysis Type", 

            [
                "General Legal Query", 
                "Legal Precedent Comparison"
            ]
        )

        # Input Fields based on Analysis Type
        if analysis_type == "General Legal Query":
            question = st.text_area("Enter your Legal Query 🧑‍⚖️")
            
            # Additional Context Selectors
            col1, col2 = st.columns(2)
            with col1:
                legal_domain = st.selectbox(
                    "Legal Domain", 
                    [
                        "Commercial Law", 
                        "Criminal Law", 
                        "Constitutional Law", 
                        "Civil Law", 
                        "Corporate Law"
                    ]
                )
            
            with col2:
                jurisdiction = st.selectbox(
                    "Jurisdiction", 
                    [
                        "Supreme Court of India", 
                        "High Court", 
                        "District Court", 
                        "National Company Law Tribunal"
                    ]
                )

        elif analysis_type == "Legal Precedent Comparison":
            col1, col2 = st.columns(2)
            with col1:
                case1 = st.text_input("First Landmark Case")
            with col2:
                case2 = st.text_input("Second Landmark Case")
            
            comparison_aspect = st.selectbox(
                "Comparison Basis", 
                [
                    "Legal Principles", 
                    "Judicial Reasoning", 
                    "Societal Impact", 
                    "Constitutional Interpretation"
                ]
            )
            
            question = f"Compare legal precedents {case1} and {case2} based on {comparison_aspect}"



        # Advanced Prompt Engineering
        languages = {
            "English": "en",
            "Hindi": "hi",
            "Bengali": "bn",
            "Marathi": "mr",
            "Punjabi": "pa",
            "Gujarati": "gu",
            "Oriya": "or"
        }

        # Dropdown for language selection
        selected_language = st.selectbox(
            "Select Language",
            list(languages.keys())
        )
        advanced_prompt = f"""
        As a highly specialized legal research assistant from India, provide a comprehensive analysis for only Indian Documents:
        if target language is of {selected_language} then convert the following query into {selected_language}:

        Context: {analysis_type}
        Query: {question}

        Detailed Analysis Requirements:
        1. Provide a structured breakdown of legal principles
        2. Cite relevant case laws and their significance
        3. Explain judicial reasoning and interpretations
        4. Highlight potential legal implications
        5. Suggest potential strategies or considerations
        6. Include references to specific legal provisions
        7. Provide the live links for the direct documents and references.

        Approach the analysis with:
        - Objectivity
        - Academic rigor
        - Comprehensive legal perspective
        """

        # Analysis Button
        if st.button("Generate Legal Analysis"):
            with st.spinner("Conducting Legal Research..."):
                try:
                    # Use Gemini for Advanced Legal Analysis
                    legal_analysis = get_gemini_response(advanced_prompt)
                    
                    # Display Original Analysis
                    st.markdown("### 📜 Legal Analysis Report (Original)")
                    st.write(legal_analysis)
                    st.download_button(
                                label="Download Analysis Result",
                                data=legal_analysis,
                                file_name="document_analysis_result.txt",
                                mime="text/plain",
                            )

                    
                    
                    # Suggest Further Reading
                    st.markdown("### 📚 Suggested Further Reading")
                    further_reading = get_gemini_response(
                        f"Suggest 3-4 academic papers or case laws related to: {question}"
                    )
                    st.success(further_reading)
                
                    
                except Exception as e:
                    st.error(f"Error in Legal Analysis: {e}")
        
        # Citation and Disclaimer
        st.markdown("""
        ---
        🔔 **Disclaimer:** 
        - This is an AI-assisted legal research tool
        - Not a substitute for professional legal advice
        - Always consult a qualified legal professional
        """)

    if selected == "IPC to BNS Converter":
        link = "https://lottie.host/299688b5-e6b2-48ad-b2e9-2fa14b1fb117/TXqg2APXpL.json"  # Replace with appropriate Lottie animation URL
        l = load_lottieurl(link)
        col1, col2 = st.columns([1, 9])
        with col1:
            st.lottie(l, height=100, width=100)
        with col2:
            st.header(f":scales: IPC to BNS Converter", divider='rainbow')

        st.write("Convert IPC Sections to their BNS equivalents easily.")

        # Input IPC Section
        selected_ipc_section = st.selectbox("Select an IPC Section to Convert", list(ipc_to_bns_mapping.keys()))
        if st.button("Convert"):
            with st.spinner("Converting..."):
                bns_equivalent = ipc_to_bns_mapping.get(selected_ipc_section, "No equivalent found in BNS.")
                st.success(f"**BNS Equivalent:** {bns_equivalent}")

