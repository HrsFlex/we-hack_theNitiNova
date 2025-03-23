We are The Niti Nova.
Legal & Governanace


## Interactive Features

### Upload Your GIF
Enhance your UI by uploading a GIF. Drag and drop your file or click the button below to select a GIF.

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <label for="gifUpload">Choose a GIF to upload:</label>
    <input type="file" id="gifUpload" name="gifUpload" accept=".gif">
    <button type="submit">Upload</button>
</form>
```

### Preview Section
Once uploaded, your GIF will be displayed here for preview.

```html
<div id="gifPreview">
    <p>No GIF uploaded yet.</p>
</div>
```

### Instructions
1. Click the "Choose a GIF to upload" button.
2. Select a `.gif` file from your device.
3. Click "Upload" to see your GIF in the preview section.

