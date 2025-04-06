document.getElementById('upload-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('pdf-file');
    const statusText = document.getElementById('status');

    if (fileInput.files.length === 0) {
        statusText.textContent = 'يرجى اختيار ملف PDF.';
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    statusText.textContent = 'جاري التحويل...';

    try {
        const response = await fetch('https://v2.convertapi.com/convert/pdf/to/docx?Secret=secret_2CitnroLCAMSTGiX', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('فشل التحويل.');
        }

        const data = await response.json();
        const resultUrl = data.Files[0].Url;

        const downloadLink = document.createElement('a');
        downloadLink.href = resultUrl;
        downloadLink.download = 'converted.docx';
        downloadLink.textContent = 'انقر هنا لتنزيل الملف المحول';
        statusText.innerHTML = '';
        statusText.appendChild(downloadLink);
    } catch (error) {
        statusText.textContent = 'حدث خطأ أثناء التحويل.';
    }
});