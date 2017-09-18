/**
 * Created by yangjian on 17-9-18.
 */
(function() {

	Array.prototype.contain = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (obj == this[i]) {
				return true;
			}
		}
		return false;
	}

	Array.prototype.remove = function(obj) {
		var _new = [];
		for (var i = 0; i < this.length; i++) {
			if (obj != this[i]) {
				_new.push(this[i]);
			}
		}
		return _new;
	}

	var Canvas = function(options) {

		var configs = {
			width : 360,
			height : 300
		}; //默认配置
		options = options || {};
		for(var name in options) {
			configs[name] = options[name];
		}
		var canvas = G(configs.canvasId); //画布
		var context = canvas.getContext("2d"); //绘图环境
		var prevBtn = G("J_prevStep"); //上一步
		var nextBtn = G("J_nextStep"); //下一步
		var drawing = false; //是否正在绘制
		var prevSteps = []; //返回上一步操作
		var nextSteps = []; //恢复下一步操作

		// 事件绑定
		canvas.onmousedown = startDrawing;
		canvas.onmouseup = stopDrawing;
		canvas.onmouseout = stopDrawing;
		canvas.onmousemove = doDrawing;
		prevBtn.onclick = gotoPrevStep;
		nextBtn.onclick = gotoNextStep;


		function G(id) {
			return document.getElementById(id);
		}

		function startDrawing(e) {
			drawing = true;
			//记录上一步的数据
			prevSteps.push(context.getImageData(0, 0, configs.width, configs.height));
			addClass(prevBtn, "prevStepH");

			// 创建一个新的绘图路径
			context.beginPath();
			// 把画笔移动到鼠标位置
			context.moveTo(canvas.offsetLeft + e.pageX, canvas.offsetTop + e.pageY);
		}

		// 停止绘制
		function stopDrawing() {
			drawing = false;
		}

		//绘制图像
		function doDrawing(e) {
			if (drawing) {
				// 找到鼠标最新位置
				var x = e.pageX - canvas.offsetLeft;
				var y = e.pageY - canvas.offsetTop;
				// 画一条直线到鼠标最新位置
				context.lineTo(x, y);
				context.stroke();
			}
		}

		/**
		 * 返回上一步操作
		 */
		function gotoPrevStep() {
			if (prevSteps.length > 0) {
				var imgData = prevSteps.pop();
				context.putImageData(imgData, 0, 0);
				nextSteps.push(imgData);

				addClass(nextBtn, "nextStepH");

				if (prevSteps.length == 0) {
					removeClass(prevBtn, "prevStepH");
				}
			}
		}

		/**
		 * 恢复下一步操作
		 */
		function gotoNextStep() {
			if (nextSteps.length > 0) {
				var imgData = nextSteps.pop();
				context.putImageData(imgData, 0, 0);
				prevSteps.push(imgData);

				addClass(prevBtn, "prevStepH");

				if (nextSteps.length == 0) {
					removeClass(nextBtn, "nextStepH");
				}
			}
		}

		/**
		 * 添加 class
		 * @param obj
		 * @param className
		 */
		function addClass(obj, className) {
			var _className = obj.className.split(" ");
			if (_className.contain(className)) {
				return;
			}
			obj.className = _className + " " + className;
		}

		/**
		 * 删除 class
		 * @param obj
		 * @param className
		 */
		function removeClass(obj, className) {
			var _className = obj.className.split(" ");
			var newClass = _className.remove(className);
			obj.className = newClass.join(" ");
		}

		//设置画笔样式
		function setCanvasStyle() {
			context.lineWidth = configs.lineWidth;
			context.shadowBlur = configs.shadowBlur;
			context.shadowColor = configs.lineColor;
			context.strokeStyle = configs.lineColor;
		}
	}

	//要导出的API
	Canvas.prototype = {


	}

	window.Canvas = Canvas;
})();