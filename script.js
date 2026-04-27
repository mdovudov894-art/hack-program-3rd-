document.getElementById('hackButton').addEventListener('click', function() {
    const btn = this;
    const loading = document.getElementById('loading');
    const timerDisplay = document.getElementById('timer');
    const result = document.getElementById('result');
    const joke = document.getElementById('joke');

    btn.classList.add('hidden');
    loading.classList.remove('hidden');

    let count = 8; // Сонияҳо

    // Таймерро сар мекунем
    const countdown = setInterval(() => {
        count--;
        timerDisplay.textContent = count;

        if (count <= 0) {
            clearInterval(countdown);
            loading.classList.add('hidden');
            
            // 1. Нишон додани "Взлом"
            result.classList.remove('hidden');

            // 2. Баъди 3 сония нишон додани "Шӯхӣ"
            setTimeout(() => {
                result.classList.add('hidden');
                joke.classList.remove('hidden');
            }, 5000);
        }
    }, 1000);
});
