var camera, light, scene, renderer, rectangle, scene2, renderer2, div, controls;
        var scene2, renderer2;
        //var scene3, renderer3;
        var items = [];
        var channel = 0;




        init();
        animate();


        function init() {
            //camera
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.set(0, 0, 3000);

            //controls
            controls = new THREE.OrbitControls(camera, document.getElementById("three"));
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            //controls.enableZoom = false;

            //Scene
            scene = new THREE.Scene();

            /*
            //CubeGeometry
            rectangle = new THREE.Mesh(new THREE.CubeGeometry(600, 350, 100), new THREE.MeshPhongMaterial());
            scene.add(rectangle);
            //TorusGeometry
            var torus = new THREE.Mesh(new THREE.TorusGeometry(60, 30, 20, 20),
                                       new THREE.MeshNormalMaterial());
            torus.position.set(10, 0, -200);
            scene.add(torus);
            //HemisphereLight
            hemiLight = new THREE.HemisphereLight(0xffbf67, 0x15c6ff);
            scene.add(hemiLight);
            */




            //console.log(Math.random()) 
            // scene
            //scene = new THREE.Scene();
            var ambient = new THREE.AmbientLight( 0x101030 );
            scene.add( ambient );
            var directionalLight = new THREE.DirectionalLight( 0xffeedd );
            directionalLight.position.set( 0, 0, 1 );
            scene.add( directionalLight );

            // texture
            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {
                //console.log( item, loaded, total );
            };
            // model
            var loader = new THREE.OBJLoader( manager );
            loader.load( 'Retro_TV/Retro_TV.obj', function ( object ) {
                //console.log(object);
                object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        //console.log(child) 
                        child.material.forEach(element => {
                            //element.color.setHex(0x00FF00);
                            let color = '0x'+(Math.random()*0xFFFFFF<<0).toString(16);
                            ////console.log(color);
            
                            element.color.setHex('0x777777');
                            ////console.log(element);
                            ////console.log(color);
                            //element.texture.setHex(0x00FF00);
                            //element.map = texture;
                        });
                          //child.material.ambient.setHex(0xFF0000);
                                          //child.material[0].color.setHex(0x00FF00);
                        //child.material.map = texture;
                    }
                } );

            obj = object
            obj.scale.set(15,15,15);
            //obj.scale.set(16,16,16);
            obj.position.y = -255;
            scene.add( obj );
            })



                

            //WebGL Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            //renderer.setClearColor(0xffffff, 1)
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.zIndex = 0;
            document.getElementById("three").appendChild(renderer.domElement);

            //CSS3D Scene
            scene2 = new THREE.Scene();

            //HTML
            element = document.createElement('div');
 
            //CSS Object
            div = new THREE.CSS3DObject(element);
            div.position.x = -195;
            div.position.y = 255;
            div.position.z = 450;
            div.id = 'tv-div';
            div.scale.set(0.5, 0.66, 0.95);
            scene2.add(div);

            //CSS3D Renderer
            renderer2 = new THREE.CSS3DRenderer();
            renderer2.setSize(window.innerWidth, window.innerHeight);
            renderer2.domElement.style.position = 'absolute';
            renderer2.domElement.style.top = 0;
            document.getElementById("three").appendChild(renderer2.domElement);
        }


        function animate() {
            requestAnimationFrame(animate);
            //renderer3.render(scene3, camera)
            renderer2.render(scene2, camera);
            renderer.render(scene, camera);
            controls.update();
        }

        //Get youtube videos

        function getLocalJsonData(searchTerm, callBack) {
            
            $.getJSON('characters.json', callBack);
        }
        
        function gotData(data) {
            //console.log(data);
            //console.log(query);
            $('#searchCharacter').val('');
            for(let i = 0; i < data.length; i++) {
                if(query.toUpperCase() === data[i].Name.toUpperCase()) {
                    let characterId = i;
                    //console.log(characterId);
                    displayCharacterInfo(data, characterId);
                }
            }
        }
        
        function displayCharacterInfo(data, characterId) {
            /*//console.log(data[characterId]);
            $('.info-results').html(
                `<p class="character-name">Name: ${data[characterId].Name}</p>
                <p class="character-culture">Culture: ${data[characterId].Culture}</p>`
            );*/   
            console.log(data);
            youtubeData = $.ajax({
                type: "GET",
                url: "https://www.googleapis.com/youtube/v3/search",
                mute: 1,
                autoplay: 1,
                data: {
                    part: "snippet",
                    key: "AIzaSyAH3n0AVo3RaBhwbs2lNFCQh6UJmluqj-w",
                    q: "dog",
                    per_page: 9,
                }, 
                success: function(data){
                    items = data.items;
                    renderYoutubeResults(); 
                }
            });
        }

        function renderYoutubeResults(data) {
                let  videoID = items[channel].id.videoId
                console.log(videoID);
                player = '<iframe src="https://www.youtube.com/embed/' + videoID + '?autoplay=1&mute=1" width="1500px" height="900px" class="tv-iframe"></iframe>';
                console.log(player);
                element.innerHTML = player;
                element.className = 'animated bounceInDown' ; 
                element.style.background = "#000000";
                element.style.fontSize = "2em";
                element.style.color = "white";
                element.style.padding = "2em";
                element.style.borderRadius = "40px";
        }
        function changeVideo() {
            //$('.change-video').click(function(event){
                //console.log($(this).data('i'));
                //channel += Number($(this).data('i'));
                if (channel > items.length - 1){
                    channel = 0;
                    
                } else if (channel < 0) {
                    channel = items.length - 1;
                }
                $('.channel-div').text(channel);
                console.log(channel)
                renderYoutubeResults();
            //})
        }

        function goToHomePage() {
            $('#three').attr('hidden', true);
            $('main').removeAttr('hidden');
        }

        function remotePlayVideo() {
            console.log(player);
        }

        function remoteGetInfo() {
            const items = youtubeData.responseJSON.items;
            console.log(items);
            console.log(items[channel].snippet.title);
            console.log(items[channel].snippet.description);
            /*$('.js-info').html(`
                <p class="video-info video-title">${items[channel].snippet.title}</p>
                <p class="video-info video-channel">${items[channel].snippet.channelTitle}</p>
                <p class="video-info">${items[channel].snippet.description}</p>`)*/
            $('.video-title').html(items[channel].snippet.title);
            $('.video-channel').html(items[channel].snippet.channelTitle);
            $('.video-description').html(items[channel].snippet.description);
        }
        
        function startSearch() {
            $('#search-form').submit(function(event){
                event.preventDefault();
                query = $('#search-video').val();
                displayCharacterInfo("dog", gotData);
                $('#three').removeAttr('hidden');
                $('main').attr('hidden', true);
            })
        }
        
        /*$('.test').click(function(){
            $('#three').removeAttr('hidden');
        })*/
        displayCharacterInfo("dog", gotData);
        startSearch();