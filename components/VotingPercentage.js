class VotingPercentage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Ambil semua element voting-card
        const votingCards = document.querySelectorAll("voting-card");

        let html = "";

        // Looping semua voting-card
        votingCards.forEach((votingCard) => {
            // Ambil data dari voting-card
            const name = votingCard.getAttribute("name");
            const id = votingCard.getAttribute("id");

            // Tambahkan ke html
            html += `
                <div class="row my-3 justify-content-center">
                    <div class="col-md-2 col-10">
                        <p class="text-md-end">${name}</p>
                    </div>
                    <div class="col-md-8 col-10">
                        <div class="progress" candidate="${id}" votes=0 role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                            <div class="progress-bar" style="width: 0%;">0%</div>
                        </div>
                    </div>
                    <div class="col-md-2 col-10">
                        <p class="text-md-start" id="vote-count-${id}">Vote: 0</p>
                    </div>
                </div>
            `;
        });

        this.innerHTML = html;
    }
}

customElements.define('voting-percentage', VotingPercentage);