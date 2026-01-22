const DATA_URL = 'bitcoin-data.json';
const HISTORY_URL = 'bitcoin-history.json';

async function fetchBitcoinData() {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();

        displayPrices(data.prices, data.rates);
        displayLastUpdate(data.timestamp);

        const historyResponse = await fetch(HISTORY_URL);
        const historyData = await historyResponse.json();
        drawPriceChart(historyData);
        drawPremiumChart(historyData);

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('prices').innerHTML = '<p>Error loading prices. Please try again later.</p>';
    }
}

function displayPrices(prices, rates) {
    const fairARS = rates.ars;
    const actualARS = prices.ars;
    const arsPremium = ((actualARS - fairARS) / fairARS) * 100;

    const actualTRY = prices.try;
    const tryPremium = ((actualTRY - rates.try) / rates.try) * 100;

    const actualNGN = prices.ngn;
    const ngnPremium = ((actualNGN - rates.ngn) / rates.ngn) * 100;

    const pricesDiv = document.getElementById('prices');
    pricesDiv.innerHTML = `
        <h2>Current Bitcoin Prices</h2>
        <p><strong>United States (USD):</strong> $${prices.usd.toLocaleString()}</p>
        <p><strong>Argentina (ARS):</strong> ${actualARS.toLocaleString()} pesos</p>
        <p><strong>Turkey (TRY):</strong> ${actualTRY.toLocaleString()} lira</p>
        <p><strong>Nigeria (NGN):</strong> ${actualNGN.toLocaleString()} naira</p>
        
        <h2>Premium/Discount vs Fair Exchange Rate</h2>
        <p><strong>Argentina:</strong> ${arsPremium.toFixed(2)}%</p>
        <p><strong>Turkey:</strong> ${tryPremium.toFixed(2)}%</p>
        <p><strong>Nigeria:</strong> ${ngnPremium.toFixed(2)}%</p>
    `;
}

function displayLastUpdate(timestamp) {
    const date = new Date(timestamp);
    const updateInfo = document.createElement('p');
    updateInfo.style.fontStyle = 'italic';
    updateInfo.style.color = '#888';
    updateInfo.textContent = `Last updated: ${date.toLocaleString()}`;
    document.getElementById('prices').appendChild(updateInfo);
}

function drawPriceChart(historyData) {
    const usdPrices = historyData.map(entry => ({
        x: new Date(entry.timestamp),
        y: entry.prices.usd
    }));

    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Bitcoin Price (USD)',
                data: usdPrices,
                borderColor: '#f7931a',
                backgroundColor: 'rgba(247, 147, 26, 0.1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: { unit: 'week', displayFormats: { week: 'MMM D' } },
                    title: { display: true, text: 'Date' }
                },
                y: { beginAtZero: false }
            }
        }
    });
}

function drawPremiumChart(historyData) {
    // Correctly mapping the data INSIDE the function
    const arsPremiums = historyData.map(entry => ({
        x: new Date(entry.timestamp),
        y: ((entry.prices.ars - entry.rates.ars) / entry.rates.ars) * 100
    }));

    const tryPremiums = historyData.map(entry => ({
        x: new Date(entry.timestamp),
        y: ((entry.prices.try - entry.rates.try) / entry.rates.try) * 100
    }));

    const ngnPremiums = historyData.map(entry => ({
        x: new Date(entry.timestamp),
        y: ((entry.prices.ngn - entry.rates.ngn) / entry.rates.ngn) * 100
    }));

    const ctx = document.getElementById('premiumChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Argentina Premium (%)',
                    data: arsPremiums,
                    borderColor: '#4CAF50',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Turkey Premium (%)',
                    data: tryPremiums,
                    borderColor: '#2196F3',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Nigeria Premium (%)',
                    data: ngnPremiums,
                    borderColor: '#FF9800',
                    tension: 0.1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Tip: Click country names in the legend to hide/show lines',
                    color: '#888',
                    font: { style: 'italic', size: 12 }
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: { unit: 'week', displayFormats: { week: 'MMM D' } },
                    title: { display: true, text: 'Timeline' }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Premium/Discount (%)' }
                }
            }
        }
    });
}

// Start the app
fetchBitcoinData();