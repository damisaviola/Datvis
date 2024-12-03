// Fungsi untuk membaca JSON dan memvisualisasikan data
fetch('processed_comments.json')
    .then(response => response.json())
    .then(data => {
        const words = {};
        data.forEach(comment => {
            const wordArray = comment.processed_comment.split(' ');
            wordArray.forEach(word => {
                if (word in words) {
                    words[word]++;
                } else {
                    words[word] = 1;
                }
            });
        });


        const wordEntries = Object.entries(words).sort((a, b) => b[1] - a[1]);
        displayWordCloud(wordEntries);

        displayTopWords(wordEntries.slice(0, 20));

        displayPieChart(wordEntries.slice(0, 10)); 

        displayDoughnutChart(wordEntries);

        displayHorizontalBarChart(wordEntries);

        displayLinePlot(wordEntries);

        displayPolarAreaChart(wordEntries);
  
        
    })
    .catch(err => console.error('Error loading JSON:', err));


    function displayWordCloud(wordEntries) {
        // Ambil 10 kata yang paling sering muncul
        const topWords = wordEntries.slice(0, 10); 
    
        const words = topWords.map(entry => ({
            name: entry[0],  // Kata
            value: entry[1], // Frekuensi kata
            textStyle: {
                normal: {
                    color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
                }
            }
        }));
    
        // Inisialisasi ECharts pada elemen dengan id 'wordCloudChart'
        const chart = echarts.init(document.getElementById('wordCloudChart'));
    
        // Opsi konfigurasi untuk Word Cloud
        const option = {
            tooltip: {
                formatter: function (params) {
                    return `${params.name}: ${params.value}`; // Menampilkan frekuensi kata pada tooltip
                }
            },
            series: [{
                type: 'wordCloud',
                sizeRange: [10, 80], // Ukuran minimal dan maksimal teks
                rotationRange: [-90, 90], // Rentang rotasi teks
                rotationStep: 45, // Langkah rotasi
                gridSize: 8, // Ukuran grid untuk pemilihan posisi kata
                shape: 'circle', // Bentuk chart
                width: '100%',
                height: '100%',
                drawOutOfBound: false,
                data: words
            }]
        };
    
        // Menggunakan opsi untuk menghasilkan Word Cloud
        chart.setOption(option);
    }
   
    
    

    // Fungsi untuk menampilkan Stacked Area Chart
    function displayPolarAreaChart(wordEntries) {
        const ctx = document.getElementById('areaChartCanvas').getContext('2d');
    
        // Ambil 5 kata yang paling sering muncul untuk polar area chart
        const topWords = wordEntries.slice(0, 5); // Ambil hanya 5 data teratas
        const labels = topWords.map(entry => entry[0]); // Ambil kata-kata
        const data = topWords.map(entry => entry[1]); // Ambil frekuensi kata-kata
    
        // Membuat polar area chart dengan desain modern
        new Chart(ctx, {
            type: 'polarArea', // Tipe chart untuk polar area
            data: {
                labels: labels, // Label untuk setiap segmen chart
                datasets: [{
                    data: data, // Data untuk frekuensi kata
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)', // Warna pertama
                        'rgba(255, 99, 132, 0.6)', // Warna kedua
                        'rgba(255, 159, 64, 0.6)', // Warna ketiga
                        'rgba(75, 192, 192, 0.6)', // Warna keempat
                        'rgba(153, 102, 255, 0.6)', // Warna kelima
                    ],
                    borderColor: [
                        '#36A2EB', '#FF6384', '#FF9F40', '#4BC0C0', '#9966FF'
                    ],
                    borderWidth: 1, // Ketebalan garis batas
                    hoverOffset: 4, // Efek hover
                }]
            },
            options: {
                responsive: true, // Responsif terhadap ukuran layar
                maintainAspectRatio: false, // Menyesuaikan aspek rasio chart
                scales: {
                    r: {
                        angleLines: {
                            display: false // Menyembunyikan garis sudut
                        },
                        suggestedMin: 0, // Menyusun sumbu radial mulai dari 0
                        suggestedMax: Math.max(...data) + 1, // Menyusun sumbu radial dengan batas maksimum yang sesuai
                        ticks: {
                            display: false, // Menyembunyikan angka sumbu
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Warna background tooltip
                        titleFont: {
                            family: 'JetBrains Mono', // Menggunakan font JetBrains Mono untuk judul
                            size: 16,
                            weight: 'bold'
                        },
                        bodyFont: {
                            family: 'JetBrains Mono', // Menggunakan font JetBrains Mono untuk isi tooltip
                            size: 14
                        },
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw; // Menampilkan tooltip
                            }
                        }
                    },
                    legend: {
                        position: 'top', // Menempatkan legenda di atas chart
                        labels: {
                            font: {
                                family: 'JetBrains Mono', // Menggunakan font JetBrains Mono untuk legend
                                size: 14,
                                weight: 'bold',
                            },
                            color: '#333' // Warna teks pada legend
                        }
                    }
                },
                animation: {
                    duration: 1000, // Durasi animasi chart pertama kali dimuat
                    easing: 'easeOutQuart', // Jenis efek animasi
                }
            }
        });
    }

    function displayWordCloudChart(wordEntries) {
        const ctx = document.getElementById('wordCloudChartCanvas').getContext('2d');
    
        // Ambil 10 kata yang paling sering muncul
        const topWords = wordEntries.slice(0, 10); // Ambil hanya 10 data teratas
        const data = topWords.map(entry => ({
            word: entry[0], // Kata
            weight: entry[1], // Frekuensi
        }));
    
        // Konfigurasi Chart.js untuk Word Cloud
        new Chart(ctx, {
            type: 'wordCloud',
            data: {
                datasets: [{
                    label: 'Word Cloud',
                    data: data.map(entry => ({
                        text: entry.word,
                        weight: entry.weight
                    }))
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        enabled: false, // Menonaktifkan tooltip
                    }
                },
                // Opsional: Menyesuaikan font, warna, dan gaya
                elements: {
                    word: {
                        font: 'JetBrains Mono',
                        color: '#000000', // Warna teks kata-kata
                        hoverColor: '#FF5733', // Warna saat hover
                        fontStyle: 'bold',
                    }
                }
            }
        });
    }

    
    
    function displayLinePlot(wordEntries) {
        const ctx = document.getElementById('linePlotCanvas').getContext('2d');
    
        // Ambil 10 kata yang paling sering muncul untuk line plot
        const topWords = wordEntries.slice(0, 10);
        const labels = topWords.map(entry => entry[0]);
        const data = topWords.map(entry => entry[1]);
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, // Label pada sumbu X
                datasets: [{
                    label: 'Frekuensi Kata',
                    data: data, // Data untuk sumbu Y
                    borderColor: '#36A2EB', // Warna garis
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Warna latar belakang area
                    fill: true, // Mengisi area di bawah garis
                    tension: 0.4, // Menambahkan kelengkungan pada garis
                    borderWidth: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Kata'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frekuensi'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const dataset = tooltipItem.dataset;
                                const currentValue = dataset.data[tooltipItem.dataIndex];
                                return tooltipItem.label + ': ' + currentValue;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000, // Durasi animasi saat chart pertama kali dimuat
                    easing: 'easeInOutQuad', // Menentukan jenis efek animasi
                }
            }
        });
    }

    
    function displayWordCloud(wordEntries) {
        const ctx = document.getElementById('wordCloudCanvas').getContext('2d');
        const labels = wordEntries.map(entry => entry[0]);
        const data = wordEntries.map(entry => entry[1]);
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.slice(0, 10),
                datasets: [{
                    label: 'Frekuensi',
                    data: data.slice(0, 10),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 0
                        }
                    },
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxRotation: 45,
                            minRotation: 0,
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Frekuensi Kata (Word Cloud)',
                        font: {
                            size: 18,
                            weight: 'bold',
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                // Menambahkan animasi hover dan interaksi
                hover: {
                    mode: 'nearest',
                    intersect: true,
                    animationDuration: 400, // Durasi animasi saat hover
                },
                animation: {
                    duration: 1000, // Durasi animasi grafik secara keseluruhan // Jenis efek animasi
                },
                elements: {
                    bar: {
                        // Mengatur animasi untuk efek hover bar
                        hoverBackgroundColor: 'rgba(255, 159, 64, 0.5)', // Warna saat hover
                        hoverBorderColor: 'rgba(255, 159, 64, 1)',
                        hoverBorderWidth: 3,
                    }
                }
            }
        });
    }
    
    //Chart.register(ChartDataLabels);

    function displayDoughnutChart(wordEntries) {
        const ctx = document.getElementById('doughnutChartCanvas').getContext('2d');
        
        const topWords = wordEntries.slice(0, 5);
        const labels = topWords.map(entry => entry[0]);
        const data = topWords.map(entry => entry[1]);
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000, // Duration of animation when the chart first loads
                    animateScale: true, // Animate scaling of the doughnut chart from the center
                    animateRotate: true // Rotate the chart during the animation
                },
                hover: {
                    mode: 'nearest',
                    intersect: true,
                    animationDuration: 400, // Hover animation duration
                },
                elements: {
                    arc: {
                        hoverBackgroundColor: function(tooltipItem) {
                            const originalColor = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][tooltipItem.index];
                            return originalColor.replace(/[^,]+(?=\))/, '0.5'); // Apply transparency on hover
                        },
                        hoverBorderColor: '#FFf',
                        hoverBorderWidth: 4,
                        hoverScale: 1,
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(tooltipItem) {
                                const dataset = tooltipItem.dataset;
                                const currentValue = dataset.data[tooltipItem.dataIndex];
                                const total = dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((currentValue / total) * 100).toFixed(2);
                                return tooltipItem.label + ': ' + currentValue + ' (' + percentage + '%)';
                            }
                        }
                    },
                    // Enable the datalabels plugin to display percentages
                    datalabels: {
                        color: '#fff', // Font color for the labels
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: function(value, context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2);
                            return percentage + '%'; // Display percentage on the doughnut chart
                        },
                        anchor: 'center', // Anchor the label to the center of the doughnut slice
                        align: 'center' // Center the label inside the doughnut slice
                    }
                }
            }
        });
    }
    
    


function displayPieChart(wordEntries) {
    const ctx = document.getElementById('pieChartCanvas').getContext('2d');
    const topWords = wordEntries.slice(0, 5);
    const labels = topWords.map(entry => entry[0]);
    const data = topWords.map(entry => entry[1]);

    // Menentukan warna untuk setiap bagian pie
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000, // Durasi animasi saat chart pertama kali muncul // Jenis efek animasi saat chart pertama kali dimuat
                animateScale: true, // Mengatur agar pie chart membesar dari titik tengah
                animateRotate: true // Mengatur agar chart berputar selama animasi
            },
            hover: {
                mode: 'nearest',
                intersect: true,
                animationDuration: 400, // Durasi animasi saat hover
            },
            elements: {
                arc: {
                    // Efek animasi saat hover pada arc (bagian pie chart)
                    hoverBackgroundColor: function(tooltipItem) {
                        // Menggunakan warna dengan transparansi saat di-hover
                        const originalColor = colors[tooltipItem.index];
                        return originalColor.replace(/[^,]+(?=\))/, '0.5'); // Mengubah Alpha menjadi 0.5 untuk transparansi
                    },
                    hoverBorderColor: '#fff', // Border color saat hover
                    hoverBorderWidth: 3, // Menambah border saat di-hover
                    hoverScale: 1.1, // Memperbesar ukuran pie section saat hover
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(tooltipItem) {
                            const dataset = tooltipItem.dataset;
                            const currentValue = dataset.data[tooltipItem.dataIndex];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((currentValue / total) * 100).toFixed(2);
                            return tooltipItem.label + ': ' + currentValue + ' (' + percentage + '%)';
                        }
                    }
                },
                // Menambahkan efek animasi pada label data di pie chart
                datalabels: {
                    color: '#fff', // Warna font label
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: function(value, context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return percentage + '%'; // Menampilkan persentase pada pie chart
                    }
                }
            }
        }
    });
}



function displayHorizontalBarChart(wordEntries) {
    const ctx = document.getElementById('horizontalBarChartCanvas').getContext('2d');

    // Ambil 5 kata yang paling sering muncul untuk bar chart
    const topWords = wordEntries.slice(0, 5);
    const labels = topWords.map(entry => entry[0]);
    const data = topWords.map(entry => entry[1]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frekuensi Kata',
                data: data,
                backgroundColor: '#36A2EB', // Warna bar
                borderColor: '#007bff', // Border bar
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Menjadikan bar horizontal
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frekuensi'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Kata'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const dataset = tooltipItem.dataset;
                            const currentValue = dataset.data[tooltipItem.dataIndex];
                            return tooltipItem.label + ': ' + currentValue;
                        }
                    }
                }
            }
        }
    });
}





// Fungsi untuk menampilkan Top Words ke dalam tabel
function displayTopWords(topWords) {
    const tableBody = document.getElementById('topWordsTable');
    topWords.forEach(([word, frequency]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${word}</td><td>${frequency}</td>`;
        tableBody.appendChild(row);
    });
}
