document.addEventListener('DOMContentLoaded', () => {
    class Typewriter {
        constructor(el, options) {
            this.el = el;
            this.words = [...this.el.dataset.typewriter.split(',')];
            this.speed = options?.speed || 150;
            this.delay = options?.delay || 1000;
            this.repeat = options?.repeat;
            this.initTyping();
        }

        wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

        toggleTyping = () => this.el.classList.toggle('typing');

        async typewriter(word) {
            this.el.textContent = '';
            this.toggleTyping();
            await this.wait(this.delay);
            for (const letter of word.split('')) {
                this.el.textContent += letter;
                await this.wait(this.speed);
            }
            this.toggleTyping();
            await this.wait(this.delay);
            this.toggleTyping();
            while (this.el.textContent.length !== 0) {
                this.el.textContent = this.el.textContent.slice(0, -1);
                await this.wait(this.speed);
            }
            this.toggleTyping();
        }

        async initTyping() {
            for (const word of this.words) {
                await this.typewriter(word);
            }
            if (this.repeat) {
                await this.initTyping();
            }
        }
    }

    const el1 = new Typewriter(document.querySelector('[data-typewriter]'), {
        speed: 80,
        repeat: true,
    });

    const projectBtn = document.querySelector('.project-btn');
    const certificateBtn = document.querySelector('.certificate-btn');
    const projectsContent = document.querySelectorAll('.projects-content');
    const certificatesContent = document.querySelectorAll('.certificates-content');

    // Fungsi untuk menampilkan hanya projects
    function showProjects() {
        projectBtn.classList.add('active');
        certificateBtn.classList.remove('active');
        
        // Sembunyikan semua certificates content
        certificatesContent.forEach(content => {
            content.style.display = 'none';
        });
        
        // Tampilkan semua projects content
        projectsContent.forEach(content => {
            content.style.display = 'flex';
        });
    }

    // Fungsi untuk menampilkan hanya certificates
    function showCertificates() {
        certificateBtn.classList.add('active');
        projectBtn.classList.remove('active');
        
        // Sembunyikan semua projects content
        projectsContent.forEach(content => {
            content.style.display = 'none';
        });
        
        // Tampilkan semua certificates content
        certificatesContent.forEach(content => {
            content.style.display = 'flex';
        });
    }

    // Event listeners untuk tombol
    projectBtn.addEventListener('click', showProjects);
    certificateBtn.addEventListener('click', showCertificates);

    // Default: tampilkan projects saat halaman dimuat
    showProjects();

    console.log("Logical (CSS) viewport:", document.documentElement.clientWidth, "x", document.documentElement.clientHeight);
console.log("Physical (real) pixel:", window.innerWidth * window.devicePixelRatio, "x", window.innerHeight * window.devicePixelRatio);
console.log("Device Pixel Ratio:", window.devicePixelRatio);


});
