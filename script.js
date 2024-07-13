//Search locomotive scrolltrigger codepen

function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()

function navbarAnimation(){
    gsap.to("#nav-part1 img",{
        transform: "translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub: true
        }
    })
    
    gsap.to("#nav-part2 #links",{
        transform: "translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub: true
        }
    })
}
navbarAnimation()

function videoconAnimation(){
var videocon= document.querySelector("#video-container")
var playbtn= document.querySelector("#play")

videocon.addEventListener("mouseenter",()=>{
    gsap.to(playbtn,{
        scale:1,
        opacity:1
    })
})

videocon.addEventListener("mouseleave",()=>{
    gsap.to(playbtn,{
        scale:0,
        opacity:0
    })
})

videocon.addEventListener("mousemove",(dets)=>{
    var rect = videocon.getBoundingClientRect();
        gsap.to(playbtn, {
            left: dets.clientX - rect.left - 70,
            top: dets.clientY - rect.top - 70
        });
})
}
videoconAnimation()

function loadAnimation(){
gsap.from("#page1 h1",{
    y:100,
    opacity:0,
    duration:0.5,
    stagger: 0.3
})

gsap.from("#page1 #video-container",{
    scale:0.9,
    opacity:0,
    delay:1,
    duration:0.3,
})
}
loadAnimation()

function sliderAnimation(){
    var imgbtn= document.querySelectorAll(".elem .dets")
    imgbtn.forEach(e =>{
        e.addEventListener("mouseenter",()=>{
            gsap.to(e,{
                top:"46vh",
                height:"200px",
                borderRadius:"25px"
            })
    
            e.querySelector("#hidden").style.display="flex"
        })
        e.addEventListener("mouseleave",()=>{
            gsap.to(e,{
                height:"40px",
            })
            e.querySelector("#hidden").style.display="none"
        })
    });
}
sliderAnimation()

function movingcircle(){
    document.addEventListener("mousemove", (dets)=>[
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y
        })
    ])
    
    document.querySelectorAll(".child").forEach(e => {
        e.addEventListener("mouseenter",()=>{
            gsap.to("#cursor",{
                transform: 'translate(-50%, -50%) scale(1)'
            })
        })
    });
    document.querySelectorAll(".child").forEach(e => {
        e.addEventListener("mouseleave",()=>{
            gsap.to("#cursor",{
                transform: 'translate(-50%, -50%) scale(0)'
            })
        })
    });
}
movingcircle()

let animationPlayed = false;

document.querySelector("#page4").addEventListener("mouseenter", () => {
    if (!animationPlayed) {
        gsap.from('#page4 .list ul li', {
            opacity: 0,
            y: 30,
            duration: 1,  // Set duration for the list items animation
            delay: 0.5,
            stagger: 0.1
        });

        gsap.from('.biglogo', {
            opacity: 0,
            scale: 0,
            duration: 1,  // Set duration for the big logo animation
            delay: 0.5,
        });

        animationPlayed = true;  // Mark animation as played
    }
});

// gsap.from('#page4 .list ul li', {
//     scrollTrigger:'#page4',
//     opacity: 0,
//     y:30,
//     duration: 1,
//     delay:0.5,
//     stagger: 0.1
// });

// gsap.from('.biglogo', {
//     scrollTrigger:'#page4',
//     opacity: 0,
//     scale:0,
//     duration: 1,
//     delay:0.5,
// });