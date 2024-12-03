// Fungsi untuk membuat grafik batang (Bar Chart)
function createBarChart(wordEntries) {
    const barChartDiv = document.getElementById('barChart');

    // Persiapkan data untuk grafik batang
    const data = wordEntries.map(([word, frequency]) => ({ word, frequency }));

    // Tentukan dimensi grafik
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = barChartDiv.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Buat SVG untuk grafik batang
    const svg = d3.select(barChartDiv).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Skala untuk sumbu X (kata) dan Y (frekuensi)
    const x = d3.scaleBand()
        .domain(data.map(d => d.word))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.frequency)])
        .nice()
        .range([height, 0]);

    // Tambahkan sumbu X
    svg.append("g")
        .selectAll(".x-axis")
        .data(data)
        .enter().append("text")
        .attr("class", "x-axis")
        .attr("x", d => x(d.word))
        .attr("y", height + 20)
        .attr("text-anchor", "middle")
        .text(d => d.word)
        .style("font-size", "12px");

    // Tambahkan sumbu Y
    svg.append("g")
        .selectAll(".y-axis")
        .data(data)
        .enter().append("text")
        .attr("class", "y-axis")
        .attr("x", 30)
        .attr("y", d => y(d.frequency))
        .attr("text-anchor", "middle")
        .text(d => d.frequency)
        .style("font-size", "12px");

    // Gambarkan batang untuk setiap data
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.word))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.frequency))
        .attr("height", d => height - y(d.frequency))
        .style("fill", "steelblue");
}
