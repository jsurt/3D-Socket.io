var camera, light, scene, renderer, rectangle, scene2, renderer2, div, controls;
        var scene2, renderer2;
        var items = [];
        var channel = 0;
        let query = $('#search-video').val();




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

            //Scene
            scene = new THREE.Scene();

           
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
                object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        child.material.forEach(element => {
                            let color = '0x'+(Math.random()*0xFFFFFF<<0).toString(16);
                            element.color.setHex('0x777777');;
                        });
                          
                    }
                } );

            obj = object
            obj.scale.set(15,15,15);
            obj.position.y = -255;
            scene.add( obj );
            })



                

            //WebGL Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
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
            renderer2.render(scene2, camera);
            renderer.render(scene, camera);
            controls.update();
        }
        
        function startSearch() {
            $('#search-form').submit(function(event){
                event.preventDefault();
                query = $('#search-video').val();
                socket.emit('search',  {
                    query: query
                });
            })
        }
        socket.on('search', (data) => {
            //query = $('#search-video').val();
            console.log(data.query);
            let query = data.query;
            getYouTubeData(query);
            $('#three').removeAttr('hidden');
            if ($(window).width() > 600) {
                $('main').attr('hidden', true);
            } else {
            $('.header-form-wrap, .directionsDiv').attr('hidden', true);
            }
            $('#search-video').blur();
        })
        function getYouTubeData(query) {
            //query = $('#search-video').val();
            console.log(query);
            //console.log(data);
            youtubeData = $.ajax({
                type: "GET",
                url: "https://www.googleapis.com/youtube/v3/search",
                mute: 1,
                autoplay: 1,
                data: {
                    part: "snippet",
                    key: "AIzaSyAH3n0AVo3RaBhwbs2lNFCQh6UJmluqj-w",
                    q: `${query}`,
                    per_page: 9,
                }, 
                success: function(data){
                    console.log(data);
                    items = data.items;
                    renderYoutubeResults(data); 
                }
            });
        }

        function renderYoutubeResults(data) {
                let  videoID = items[channel].id.videoId;
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
                $('.video-info').attr('hidden', true);
                if (channel > items.length - 1){
                    channel = 0;
                    
                } else if (channel < 0) {
                    channel = items.length - 1;
                }
                $('.channel-div').text(channel);
                console.log(channel)
                renderYoutubeResults();
        }

        function goToHomePage() {
            $('#search-video').val('');
            $('.video-info').attr('hidden', true);
            $('#three').attr('hidden', true);
            $('main').removeAttr('hidden');
        }

        function remoteGetInfo() {
            let $videoInfo = $('.video-info')
            if($videoInfo.attr('hidden', true)) {
                $videoInfo.attr('hidden', false);
            } else {
                $videoInfo.attr('hidden', true);
            }
            const items = youtubeData.responseJSON.items;
            console.log(items);
            console.log(items[channel].snippet.title);
            console.log(items[channel].snippet.description);
            /*$('.js-info').html(`
                <p class="video-info video-title">${items[channel].snippet.title}</p>
                <p class="video-info video-channel">${items[channel].snippet.channelTitle}</p>
                <p class="video-info">${items[channel].snippet.description}</p>`);*/
            $('.video-title').html(`
                <h6 class="info-title">Video Title</h6>
                <p>${items[channel].snippet.title}</p>
            `);
            $('.video-channel').html(`
                <h6 class="info-title">Channel Title</h6>
                <p>${items[channel].snippet.channelTitle}</p>
            `);
            $('.video-description').html(`
                <h6 class="info-title">Summary</h6>
                <p>${items[channel].snippet.description}</p>
            `);
        }

        function powerOffAnimation() {
            $('.youtube-logo, iframe, video, .animated').toggleClass('hidden');
            $('div#topDiv').animate({
                //51% for chrome
                height: "51%",
                opacity: 1
            }, 300);
            $('div#bottomDiv').animate({
                //51% for chrome
                height: "51%",
                opacity: 1
            }, 300, function(){
                    $('div#centerDiv').css({display: "block"}).animate({
                            width: "0%",
                            left: "50%"
                         }, 300);
                    }
            );
        }

        function powerOff() {
            $('div#topDiv, div#bottomDiv, div#centerDiv').toggleClass('off');
            $('.youtube-logo, iframe, video').toggleClass('hidden');
        }
        
        startSearch();