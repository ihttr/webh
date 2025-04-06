// document.getElementById('upload-form').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const fileInput = document.getElementById('pdf-file');
//     const statusText = document.getElementById('status');

//     if (fileInput.files.length === 0) {
//         statusText.textContent = 'يرجى اختيار ملف PDF.';
//         return;
//     }

//     const file = fileInput.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     statusText.textContent = 'جاري التحويل...';

//     try {
//         const response = await fetch('https://v2.convertapi.com/convert/pdf/to/docx?Secret=secret_2CitnroLCAMSTGiX', {
//             method: 'POST',
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error('فشل التحويل.');
//         }

//         const data = await response.json();
//         const resultUrl = data.Files[0].Url;

//         const downloadLink = document.createElement('a');
//         downloadLink.href = resultUrl;
//         downloadLink.download = 'converted.docx';
//         downloadLink.textContent = 'انقر هنا لتنزيل الملف المحول';
//         statusText.innerHTML = '';
//         statusText.appendChild(downloadLink);
//     } catch (error) {
//         statusText.textContent = 'حدث خطأ أثناء التحويل.';
//     }
// });


document.getElementById("convert-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("input-file");
  const status = document.getElementById("status");

  if (fileInput.files.length === 0) {
    status.textContent = "يرجى اختيار ملف.";
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name.split('.').slice(0, -1).join('.'); // نفس اسم الملف بدون الامتداد
  const extension = file.name.split('.').pop();

  if (!['docx', 'pptx'].includes(extension)) {
    status.textContent = "الملف يجب أن يكون Word أو PowerPoint.";
    return;
  }

  const formData = new FormData();
  formData.append("File", file);

  const apiKey = "secret_2CitnroLCAMSTGiX"; // استبدل هذا بالمفتاح الخاص بك

  status.textContent = "جاري التحويل...";

  try {
    const response = await fetch(`https://v2.convertapi.com/convert/${extension}/to/pdf?Secret=${apiKey}`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const fileUrl = data.Files[0].Url;

    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `${fileName}.pdf`;
    a.textContent = "تحميل الملف المحول";
    status.innerHTML = "";
    status.appendChild(a);
  } catch (error) {
    console.error(error);
    status.textContent = "حدث خطأ أثناء التحويل.";
  }
});
