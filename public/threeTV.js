console.log('hi')
var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
var container, stats;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
initTV();

function initTV() {
    container = document.createElement( 'div' );
 //   container.setAttribute("id","tv")    
    container.id = 'tv'
    document.body.appendChild( container );
    //document.getElementById("tv").style.z-index="5";
    //container = document.getElementById('tv'); 
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.z = 500;
    // scene
    scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );
    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );
    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };
    // model
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'Retro_TV/Retro_TV.obj', function ( object ) {
        console.log(object);
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                console.log(child) 
                child.material.forEach(element => {
                    //element.color.setHex(0x00FF00);
                    let color = '0x'+(Math.random()*0xFFFFFF<<0).toString(16);
                    console.log(color);
    
                    element.color.setHex('0xffffff');
                    console.log(element);
                    console.log(color);
                    
                    //element.texture.setHex(0x00FF00);
                    //element.map = texture;
                });
                  //child.material.ambient.setHex(0xFF0000);
                                  //child.material[0].color.setHex(0x00FF00);
                //child.material.map = texture;
            }
        } );
        /*object.position.x = - 60;
            object.rotation.x = 20* Math.PI / 180;
            object.rotation.z = 20* Math.PI / 180;
            object.scale.x = 30;
            object.scale.y = 30;
            object.scale.z = 30;*/
            obj = object
        scene.add( obj );
        animate();
    } );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
    
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
            //obj.rotation.y += (0.2*(Math.PI / 180));
            //obj.rotation.y %=360;
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
    renderer.domElement.style.zIndex = 5;
}


