// smooth website

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



// first page animation 

function firstPage(){ 

    console.log("working")
    var tl= gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelm", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })

    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

// small circle mouse follower

function circleMouseFollower(xscale, yscale)
{
    window.addEventListener("mousemove", function(details){
        // console.log(details.clientX, details.clientY);
        document.querySelector('.minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;

    })
}

let timeout;

// shape changing of small circle on mouse movement

function circleblunt(){
    let xscale = 1;
    let yscale = 1;

    let xprev= 0;
    let yprev= 0;

    window.addEventListener("mousemove", function(details){
        this.clearTimeout(timeout)
        const xdiff =details.clientX - xprev;
        const ydiff =details.clientY - yprev;

        
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);
        
        xprev = details.clientX;
        yprev = details.clientY;

        circleMouseFollower(xscale, yscale)

        timeout = setTimeout(function(){
            document.querySelector('.minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
        }, 100)

    })
}

circleMouseFollower()
firstPage()
circleblunt()


// image movement according to scroll

// selecting images and displaying

document.querySelectorAll(".elem").forEach(function(elem)
{

    let rotate = 0;
    let diffrot = 0;

    //on mouse move what would happen

    elem.addEventListener("mousemove", function(details){ //for mouse x axis and y axis details
    var diff = details.clientY - elem.getBoundingClientRect().top;

    diffrot = details.clientX - rotate;
    rotate = details.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            // top: diff,
            left: details.clientX,
            rotate:  gsap.utils.clamp(-20, 20, diffrot*0.5),
        });
    });

    elem.addEventListener("mouseleave", function(details){ //for mouse x axis and y axis details


        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power2,
            duration: 0.5,
        });
    });
}); 



