
class BtnAnimation {
     constructor () {
         this.three = {html: [document.querySelector(".three-l"), document.querySelector(".three-r")], color: ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)']}
         this.two = {html: [document.querySelector(".two-l"), document.querySelector(".two-r")], color: ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.9)']}
         this.one = {html: [document.querySelector(".one-l"), document.querySelector(".one-r")], color: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.6)']}
         setInterval(this.animate, 500)
        }

     animate = async () => {
        //  console.log(`CALL ME PLEASE`);
        //! This animation sets the color for every cheveron;
        //? First chev div; first color.
        let currentColor = this.three.color.shift()
        // console.log(this.three);
        // console.log(this.three.color);
        // console.log(currentColor);
        this.three.html[0].style.color = currentColor;
        this.three.html[1].style.color = currentColor;
        this.three.color.push(currentColor);
        //? Next color:
        currentColor = this.two.color.shift()
        this.two.html[0].style.color = currentColor;
        this.two.html[1].style.color = currentColor;
        this.two.color.push(currentColor);
        //? Th final div, next color:
        currentColor = this.one.color.shift()
        this.one.html[0].style.color = currentColor;
        this.one.html[1].style.color = currentColor;
        this.one.color.push(currentColor);
     }

     timer = async (time) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, time);
        });
    }
}

const chevAnime = new BtnAnimation();
