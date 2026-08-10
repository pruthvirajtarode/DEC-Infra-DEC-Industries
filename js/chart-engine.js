/**
 * DEC AI Foundations - Chart & Analysis Engine (Module 2)
 */

const AnalysisEngine = {
    renderChart(canvasId, type, label, labels, dataArr) {
        const ctx = document.getElementById(canvasId);
        if(!ctx) return null;
        
        // Ensure previous chart is destroyed to prevent overlap
        if(window[`_chart_${canvasId}`]) {
            window[`_chart_${canvasId}`].destroy();
        }

        window[`_chart_${canvasId}`] = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: dataArr,
                    backgroundColor: [
                        '#0A192F',
                        '#F59E0B',
                        '#10B981',
                        '#3B82F6',
                        '#EF4444'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        return window[`_chart_${canvasId}`];
    },

    reconcile(datasetA, datasetB, matchKey) {
        // Simple reconciliation simulation
        const mismatches = [];
        const matches = [];
        
        // Simulating PO vs Invoice logic
        datasetA.forEach(a => {
            const b = datasetB.find(x => x[matchKey] === a[matchKey]);
            if (!b) {
                mismatches.push({ record: a, reason: "Missing in Dataset B" });
            } else if (a.totalAmount !== b.totalAmount) {
                mismatches.push({ 
                    recordA: a, 
                    recordB: b, 
                    reason: `Amount Mismatch: ${a.totalAmount} vs ${b.totalAmount}`
                });
            } else {
                matches.push(a);
            }
        });

        return { matches, mismatches };
    }
};

window.AnalysisEngine = AnalysisEngine;
