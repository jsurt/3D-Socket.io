var socket = io();
$('#remote a').on('click', (event) => {
    event.preventDefault();
    let remoteBtn = event.currentTarget.classList[1];
    /*console.log('test');
    console.log(event.currentTarget.classList[1]);
    console.log(this, $(this).attr('class'));*/
    socket.emit('remoteClicked',  {
        button: remoteBtn
    });
});
//var openedWindow;
var isOpen = false;

function openWindow() {
  openedWindow = window.open(window.location.href, "_blank", "x=y, width=1500, height=900, top=100, left=500");
}
function closeOpenedWindow() {
  openedWindow.close();
}
socket.on('clickButton', (data) => {
    console.log("data");
    console.log(data);
    switch (data.data.button) {
        case 'power-button':
            console.log('power');
            console.log(isOpen);
            if(isOpen) {
                closeOpenedWindow();
            } else{
                openWindow();
            }
            isOpen = !isOpen;
            break;
        case 'home-button':
            console.log('home');
            goToHomePage();
            break;
        case 'channel-up':
            //$('.js-info').empty();
            console.log('channel-up')
            channel ++;
            changeVideo();
            break;
        case 'channel-down':
            //$('.js-info').empty();
            console.log('channel-down')
            channel --;
            changeVideo();
            break;
        case 'info-button':
            console.log('info');
            remoteGetInfo();
            break;
    }
  });

