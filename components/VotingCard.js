class VotingCard extends HTMLElement {
    constructor() {
        super();
        this.name = this.getAttribute("name");
        this.major = this.getAttribute("major");
        this.img = this.getAttribute("img");
        this.id = this.getAttribute("id");
    }

    connectedCallback() {
        this.innerHTML = `
                    <div class="card text-center m-3" style="width: 18rem;">
                        <img src="img/${this.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${this.name}</h5>
                            <p class="card-text">${this.major}</p>
                            <button id="vote-${this.id}" class="btn btn-lg btn-primary">Vote</button>
                        </div>
                    </div>
                `;

        // Add event listener untuk button vote
        const voteButton = document.getElementById(`vote-${this.id}`);
        
        voteButton.addEventListener("click", () => {
            // Ambil element progress
            const progress = document.querySelector(`.progress[candidate="${this.id}"]`);
            // Ambil votes dari element progress
            let candidateVotes = parseInt(progress.getAttribute("votes"));
            // Tambahkan votes
            candidateVotes++;
            // Set votes
            progress.setAttribute("votes", candidateVotes);


            // Set vote count
            const voteCount = document.getElementById(`vote-count-${this.id}`);
            voteCount.innerHTML = `Vote: ${candidateVotes}`;


            // Ambil semua element progress
            const progresses = document.querySelectorAll(".progress");
            // Hitung total votes
            let totalVotes = 0;
            progresses.forEach((progress) => {
                totalVotes += parseInt(progress.getAttribute("votes"));
            });
            // Update progress setiap candidate
            progresses.forEach((progress) => {
                const candidateVotes = parseInt(progress.getAttribute("votes"));
                const percentage = (candidateVotes / totalVotes) * 100;
                progress.setAttribute("aria-valuenow", percentage);
                const progressbar = progress.querySelector(".progress-bar");
                progressbar.style.width = `${percentage}%`;
                progressbar.innerHTML = `${percentage.toFixed(2)}%`;
            });
        });

        // Set style
        this.classList.add("col");
        this.classList.add("d-flex");
        this.classList.add("justify-content-center");
    }
}

customElements.define('voting-card', VotingCard);