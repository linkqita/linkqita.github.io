
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const grid = document.getElementById('linkGrid');
    const searchInput = document.getElementById('searchInput');
    const catBtns = document.querySelectorAll('.cat-btn');

    let currentFilter = 'ALL';

    const renderLinks = (filter = 'ALL', search = '') => {
        grid.innerHTML = '';
        const filtered = portalData.filter(item => {
            const matchesCat = filter === 'ALL' || item.category === filter;
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            return matchesCat && matchesSearch;
        });

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-glass p-4 rounded-3xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer shadow-sm';
            card.innerHTML = `
                <div class="p-3 bg-indigo-100/50 rounded-2xl text-indigo-600">
                    <i data-lucide="${item.icon}" class="w-8 h-8"></i>
                </div>
                <span class="text-xs font-bold text-indigo-900 leading-tight">${item.name}</span>
            `;
            card.onclick = () => window.open(item.url, '_blank');
            grid.appendChild(card);
        });
        lucide.createIcons();
    };

    searchInput.addEventListener('input', (e) => {
        renderLinks(currentFilter, e.target.value);
    });

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.cat;
            renderLinks(currentFilter, searchInput.value);
        });
    });

    renderLinks();
});
