import Chart from 'chart.js/auto';

export function init() {
    window.addEventListener("DOMContentLoaded", function () {

            const imageBox = document.getElementById("imageBox");
            const legend = document.getElementById("legend");

            const images = JSON.parse(imageBox.dataset.data);
            const charts = [];

            function getLegendElement(label, color) {
                const element = document.createElement('div');
                element.classList.add('flex', 'gap-2', 'items-center', 'cursor-pointer', 'hover:text-accent');
                element.innerHTML = `
                    <i class="fa-solid fa-circle" style="color: ${color}"></i>
                    <p class="text-lg">${label}</p>
                `;
                return element;
            }

            for (let i = 0; i < images.length; i++) {

                const labels = [];
                for (let j = 0; j < images[i].predictions.length; j++) {
                    labels.push(images[i].predictions[j].label);
                }

                const data = {
                    labels: labels,
                    datasets: [{
                        data: images[i].predictions.map(pred => pred.confidence),
                    }]
                }

                const chart = new Chart(
                    document.getElementById(`polar-${i}`),
                    {
                        type: 'polarArea',
                        data: data,
                        options: {
                            layout: {
                                padding: 5,
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                }
                            }
                        }
                    }
                );

                charts.push(chart);
            }

            if (charts.length > 0) {
                const items = charts[0].options.plugins.legend.labels.generateLabels(charts[0]);
                items.forEach(item => {
                    const itemElement = getLegendElement(item.text, item.fillStyle);
                    legend.appendChild(itemElement);
                    itemElement.addEventListener('click', function () {
                        itemElement.style.textDecoration = itemElement.style.textDecoration ? '' : 'line-through';
                        itemElement.style.opacity = itemElement.style.opacity === '0.5' ? '1' : '0.5';
                        const index = item.index;
                        charts.forEach(chart => {
                            chart.toggleDataVisibility(index);
                            chart.update();
                        });
                    });
                })
            }
        }
    )
    ;
}