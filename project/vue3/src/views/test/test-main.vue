<script setup lang="ts">
	import { PDFDocument } from 'pdf-lib';
	import { ref, onMounted } from 'vue';

	const pdfFile = ref<File | null>(null);
	const loading = ref(false);
	const isDrawing = ref(false);
	const canvas = ref<HTMLCanvasElement | null>(null);
	const canvasContext = ref<CanvasRenderingContext2D | null>(null);
	const lastX = ref(0);
	const lastY = ref(0);

	// 初始化画布
	onMounted(() => {
		if (canvas.value) {
			canvas.value.width = 400;
			canvas.value.height = 200;
			canvasContext.value = canvas.value.getContext('2d');
			if (canvasContext.value) {
				canvasContext.value.strokeStyle = '#000';
				canvasContext.value.lineWidth = 2;
				canvasContext.value.lineCap = 'round';
			}
		}
	});

	// 开始绘制
	const startDrawing = (e: MouseEvent) => {
		isDrawing.value = true;
		const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
		lastX.value = e.clientX - rect.left;
		lastY.value = e.clientY - rect.top;
	};

	// 绘制过程
	const draw = (e: MouseEvent) => {
		if (!isDrawing.value || !canvasContext.value) return;
		const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		canvasContext.value.beginPath();
		canvasContext.value.moveTo(lastX.value, lastY.value);
		canvasContext.value.lineTo(x, y);
		canvasContext.value.stroke();

		lastX.value = x;
		lastY.value = y;
	};

	// 结束绘制
	const stopDrawing = () => {
		isDrawing.value = false;
	};

	// 清除画布
	const clearCanvas = () => {
		if (canvasContext.value && canvas.value) {
			canvasContext.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
		}
	};

	// 获取手写签名图片
	const getSignatureImage = (): Promise<ArrayBuffer> => {
		return new Promise((resolve) => {
			if (canvas.value) {
				canvas.value.toBlob((blob) => {
					if (blob) {
						blob.arrayBuffer().then(resolve);
					}
				}, 'image/png');
			}
		});
	};

	// 处理PDF文件上传
	const handlePdfUpload = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			pdfFile.value = target.files[0];
		}
	};

	// 添加签名到PDF
	async function addSignature(pdfBytes: ArrayBuffer, signatureImageBytes: ArrayBuffer) {
		const pdfDoc = await PDFDocument.load(pdfBytes);
		const pages = pdfDoc.getPages();
		const lastPage = pages[pages.length - 1];
		
		// 获取页面尺寸
		const { width, height } = lastPage.getSize();
		
		// 添加签名图片到最后一页
		const image = await pdfDoc.embedPng(signatureImageBytes);
		const signatureWidth = 200;
		const signatureHeight = 100;
		
		lastPage.drawImage(image, {
			x: width - signatureWidth - 50, // 距离右边50单位
			y: 50, // 距离底部50单位
			width: signatureWidth,
			height: signatureHeight
		});

		return await pdfDoc.save();
	}

	// 处理签名并下载
	async function handleSign() {
		if (!pdfFile.value || !canvas.value) {
			alert('请先上传PDF文件并绘制签名');
			return;
		}

		try {
			loading.value = true;
			
			// 读取文件
			const pdfBuffer = await pdfFile.value.arrayBuffer();
			const signatureBuffer = await getSignatureImage();
			
			// 添加签名
			const signedPdfBytes = await addSignature(pdfBuffer, signatureBuffer);
			
			// 创建下载链接
			const blob = new Blob([signedPdfBytes], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'signed-document.pdf';
			link.click();
			
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('签名过程出错:', error);
			alert('签名过程出错，请重试');
		} finally {
			loading.value = false;
		}
	}
</script>
<template>
	<div class="pdf-signature">
		<h1>PDF签名工具</h1>
		
		<div class="upload-section">
			<div class="upload-item">
				<label>选择PDF文件：</label>
				<input type="file" accept=".pdf" @change="handlePdfUpload" />
				<div class="file-name" v-if="pdfFile">已选择: {{ pdfFile.name }}</div>
			</div>
			
			<div class="signature-canvas-container">
				<label>手写签名：</label>
				<canvas
					ref="canvas"
					class="signature-canvas"
					@mousedown="startDrawing"
					@mousemove="draw"
					@mouseup="stopDrawing"
					@mouseleave="stopDrawing"
				></canvas>
				<button class="clear-button" @click="clearCanvas">清除签名</button>
			</div>
		</div>

		<button 
			class="sign-button" 
			@click="handleSign" 
			:disabled="!pdfFile || loading"
		>
			{{ loading ? '处理中...' : '添加签名并下载' }}
		</button>
	</div>
</template>

<style scoped>
.pdf-signature {
	padding: 20px;
	max-width: 600px;
	margin: 0 auto;
}

.upload-section {
	margin: 20px 0;
}

.upload-item {
	margin: 15px 0;
}

.upload-item label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
}

.file-name {
	margin-top: 5px;
	font-size: 0.9em;
	color: #666;
}

.signature-canvas-container {
	margin: 15px 0;
}

.signature-canvas {
	border: 1px solid #ccc;
	background-color: #fff;
	margin: 10px 0;
	cursor: crosshair;
}

.clear-button {
	margin-top: 10px;
	padding: 5px 10px;
	background-color: #ff4444;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.clear-button:hover {
	background-color: #cc0000;
}

.sign-button {
	background-color: #4CAF50;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
}

.sign-button:disabled {
	background-color: #cccccc;
	cursor: not-allowed;
}

.sign-button:hover:not(:disabled) {
	background-color: #45a049;
}
</style>
