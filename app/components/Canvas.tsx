import useDraw from "@/hooks/useDraw";

type CanvasProps = {
    color: string;
};

export default function Canvas({ color }: CanvasProps) {
    function drawLine({ ctx, currentPoint, prevPoint }: Draw) {
        if (!ctx || !prevPoint) return;
        const lineWidth = 2;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.closePath();
        ctx.stroke();
    }

    const { canvasRef, clearCanvas } = useDraw(drawLine);
    return (
        <>
            <button
                className="bg-black text-white p-4 self-start rounded-md"
                onClick={clearCanvas}
            >
                Clear
            </button>
            <canvas
                ref={canvasRef}
                className="canvas border-2 border-black cursor-crosshair relative"
                width="800"
                height="600"
            />
        </>
    );
}
