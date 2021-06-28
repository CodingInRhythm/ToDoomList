// export default class Scroll {
//     constructor() {

//     this.unScrolled = document.querySelector('.un-scrolled')
//     this.header = document.querySelector('header')

//     this.frame1 = document.querySelector('.frame-1');
//     this.frame2 = document.querySelector('.frame-2');
//     this.frame3 = document.querySelector('.frame-3');
//     this.frame4 = document.querySelector('.frame-4');

//     this.playNext = true;

//     this.animationNames = [
//         {
//             animationName: 'blue-lightblue',
//             frameOut: this.frame1,
//             frameIn: this.frame2,
//             color: '#3292f2'
//         },
//         {
//             animationName: 'lightblue-violet',
//             frameOut: this.frame2,
//             frameIn: this.frame3,
//             color: '#6a4ca6'
//         },
//         {
//             animationName: 'violet-green',
//             frameOut: this.frame3,
//             frameIn: this.frame4,
//             color: '#5bb84d'

//         },
//         {
//             animationName: 'green-blue',
//             frameOut: this.frame4,
//             frameIn: this.frame1,
//             color: '#0060bf'
//         }
//     ]
// }

//     play = async () => {
        
//         while(this.playNext) {
//             await this.timer(5000)// waits with new state for 5s, then start over agiain.

//                             //MUST UNCOMMENT AFTER DEBUGGING
//             // let currTransition = this.animationNames.shift()
            
                    

//             this.unScrolled.style.animationName = currTransition.animationName
//             this.header.style.animationName = currTransition.animationName

//             currTransition.frameOut.style.animationName = 'out-of-frame';
//             currTransition.frameIn.style.animationName = 'in-to-frame';

//             this.unScrolled.style.backgroundColor = currTransition.color
//             this.header.style.backgroundColor = currTransition.color


//             currTransition.frameOut.style.left = '-250%'
//             currTransition.frameIn.style.left = '0%'
//             this.animationNames.push(currTransition)

//         }
        
//     }

//     timer = async (time) => {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve('resolved');
//             }, time);
//         });
//     }

// }