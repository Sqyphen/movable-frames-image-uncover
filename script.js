( function() {
	var canvasContainer = document.getElementById('canvas-container'),
		canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		cWidth = 0,
		cHeight = 0,
		frames = [],
		mouse = { x: 0, y: 0, px: 0, py: 0, down: false },
		imageObj = new Image(),
		frameImgObj = new Image(),
		currentFrame = null;

	
	function init(){
		imageObj.onload = function() {
			initCanvas();
		};
		imageObj.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAGaCAYAAACc1mkHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGQTdGMTE3NDA3MjA2ODExQjM0QkRCMTI3QTg3OTlBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQjg3OEJGRTM4M0YxMUUzQTZEMUI0MDIyQjJEMDFGNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQjg3OEJGRDM4M0YxMUUzQTZEMUI0MDIyQjJEMDFGNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY1NjNCMTEzNDIwNjgxMTgwODNGMTQ4QTZCNTMyNkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkE3RjExNzQwNzIwNjgxMUIzNEJEQjEyN0E4Nzk5QTAiLz4gPC9yZGY6RGVzY3Jp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";
		frameImgObj.src = "data:image/png;base64,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";
	}

	function initCanvas(){
		if(isCanvasSupported()){
			window.addEventListener('resize', resizeCanvas, false);
			generateFrames();
			addMouseListeners();
			addTouchListeners();
			resizeCanvas();
		}
	}

	function generateFrames(){
		frames.push( { id: 1, scaleX: 0.8, scaleY: 0.8, x: 0, y: 0, scaleWidth: 1.2, scaleHeight: 1.7, width: 0, height: 0 } );
		frames.push( { id: 2, scaleX: 1.4, scaleY: 1.1, x: 0, y: 0, scaleWidth: 1.0, scaleHeight: 1.5, width: 0, height: 0 } );
		frames.push( { id: 3, scaleX: 0.6, scaleY: 1.9, x: 0, y: 0, scaleWidth: 1.3, scaleHeight: 1.6, width: 0, height: 0 } );
		frames.push( { id: 4, scaleX: 1.5, scaleY: 1.8, x: 0, y: 0, scaleWidth: 2.1, scaleHeight: 2.3, width: 0, height: 0 } );
		frames.push( { id: 5, scaleX: 2.2, scaleY: 1.4, x: 0, y: 0, scaleWidth: 2.3, scaleHeight: 2.2, width: 0, height: 0 } );
	}

	function addMouseListeners(){
		canvas.addEventListener('mousemove', function( e ){
			var rect = canvas.getBoundingClientRect();
			var previousX = mouse.x;
			var previousY = mouse.y;

			mouse.px = previousX;
			mouse.py = previousY;
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;

			canvas.style.cursor = "default";

			checkFrameDrag();
		});
		canvas.addEventListener('mousedown', function( e ){
			mouse.down = true;
		});
		canvas.addEventListener('mouseup', function( e ){
			mouse.down = false;
			currentFrame = null;
		});
		canvas.addEventListener('mouseout', function( e ){
			mouse.down = false;
			currentFrame = null;
		});
	}

	function addTouchListeners(){
		canvas.addEventListener('touchmove', function( e ){
			e.preventDefault();

			var rect = canvas.getBoundingClientRect();
			var previousX = mouse.x;
			var previousY = mouse.y;

			mouse.px = previousX;
			mouse.py = previousY;
			mouse.x = e.touches[0].clientX - rect.left;
			mouse.y = e.touches[0].clientY - rect.top;

			if(mouse.px === 0){
				mouse.px = mouse.x;
			}
			if(mouse.py === 0){
				mouse.py = mouse.y;
			}

			checkFrameDrag();
		});
		canvas.addEventListener('touchstart', function( e ){
			e.preventDefault();
			mouse.down = true;
		});
		canvas.addEventListener('touchend', function( e ){
			e.preventDefault();
			mouse = { x: 0, y: 0, px: 0, py: 0, down: false };
			currentFrame = null;
		});
	}

	function canvasDraw(){
		if(ctx){
	        ctx.clearRect(0, 0, canvas.width, canvas.height);

			frames.forEach(function(element){
				ctx.save();
			    ctx.beginPath();
			    ctx.moveTo(element.x, element.y);
			    ctx.lineTo(element.x, element.height + element.y);
			    ctx.lineTo(element.width + element.x, element.height + element.y);
			    ctx.lineTo(element.width + element.x, element.y);
			    ctx.closePath();
			    ctx.clip();

			    var imgRatio = imageObj.width / imageObj.height;
			    var imgScaledWidth = cWidth;
			    var imgScaledHeight = imgScaledWidth / imgRatio;
			    var imgCenterX = ( cWidth / 2 ) - ( imgScaledWidth / 2 );
			    var imgCenterY = ( cHeight / 2 ) - ( imgScaledHeight / 2 );

				ctx.drawImage( imageObj, imgCenterX, imgCenterY, imgScaledWidth, imgScaledHeight );

			    ctx.restore();

				ctx.drawImage(
					frameImgObj,
					element.x,
					element.y,
					element.width,
					element.height
				);
			});
		}
	}

	function checkFrameDrag(){
		if( mouse.down ){
			for(var i = frames.length-1; i >= 0; --i ){
				var element = frames[i];
				if( isMouseOverElement( element ) ){
					if( currentFrame === null ){
						currentFrame = element;
					}
				}
			}

			if( currentFrame ){
				canvas.style.cursor = "move";
				moveFrame( currentFrame );
			}
		}

		for(var j = frames.length-1; j >= 0; --j ){
			if( isMouseOverElement( frames[j] ) ){
				canvas.style.cursor = "move";
			}
		}

		canvasDraw();
	}

	function isMouseOverElement( element ) {
		if( mouse.x > element.x && mouse.x < ( element.x + element.width ) && 
			mouse.y > element.y && mouse.y < ( element.y + element.height ) )  {
			return true;
		}
		return false;
	}

	function recalculateFrames(){
		for(var i = frames.length-1; i >= 0; --i ){
			var element = frames[i];

			var scaledElementWidth = ( cWidth / 5 ) * element.scaleWidth;
			var scaledElementHeight = ( cHeight / 5 ) * element.scaleHeight;
			element.width = scaledElementWidth;
			element.height = scaledElementHeight;

			var scaledElementX = ( cWidth / 5 ) * element.scaleX;
			var scaledElementY = ( cHeight / 5 ) * element.scaleY;
			element.x = scaledElementX;
			element.y = scaledElementY;
		}
	}

	function resizeCanvas(){
		if(canvas){
			canvas.width = cWidth = canvasContainer.clientWidth;
	        canvas.height = cHeight = canvasContainer.clientHeight;

	        recalculateFrames();
	        canvasDraw();
		}
	}

	function moveFrame( element ){
		if( mouse.x < mouse.px ) {
			if( element.x <= 0 ){
				element.x = 0;
			} else {
				element.x -= mouse.px - mouse.x;
			}
		} else if( mouse.x > mouse.px ) {
			if( ( element.x + element.width ) >= cWidth ){
				element.x = cWidth - element.width;
			} else {
				element.x += mouse.x - mouse.px;
			}
		}
		if( mouse.y < mouse.py ) {
			if( element.y <= 0 ){
				element.y = 0;
			} else {
				element.y -= mouse.py - mouse.y;
			}
		} else if( mouse.y > mouse.py ) {
			if( ( element.y + element.height ) >= cHeight ){
				element.y = cHeight - element.height;
			} else {
				element.y += mouse.y - mouse.py;
			}
		}
	}

	function isCanvasSupported(){
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	}

	init();
} )();