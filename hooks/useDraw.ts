import { useCallback, useEffect, useRef, useState } from "react";

export default function useDraw(
    onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevPoint = useRef<null | Point>(null);
    const [mouseDown, setMouseDown] = useState(false);

    const findPointOnCanvas = (e: MouseEvent): Point => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const rect = canvasRef.current?.getBoundingClientRect();
        console.log(rect.left, rect.top, e.clientX, e.clientY);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return { x, y };
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const mouseMoveHandeler = useCallback((e: MouseEvent) => {
        if (!mouseDown) return;
        const ctx = canvasRef.current?.getContext("2d");
        const currentPoint = findPointOnCanvas(e);
        if (!ctx || !currentPoint) return;

        onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
        prevPoint.current = currentPoint;
    },[mouseDown, onDraw]);

    useEffect(() => {

        const mouseUpHandler = () => {
            setMouseDown(false);
            prevPoint.current = null;
        };
        const mouseDownHandler = (e: Event) => {
            setMouseDown(true);
            const ctx = canvasRef.current?.getContext("2d");
            const currentPoint = findPointOnCanvas(e as MouseEvent);
            if (!ctx || !currentPoint) return;
            prevPoint.current = currentPoint;
        };

        canvasRef.current?.addEventListener("mousemove", mouseMoveHandeler);
        window.addEventListener("mouseup", mouseUpHandler);
        canvasRef.current?.addEventListener("mousedown", mouseDownHandler);

        return () => {
            canvasRef!.current?.removeEventListener(
                "mousemove",
                mouseMoveHandeler
            );
            window.removeEventListener("mouseup", mouseUpHandler);
            canvasRef!.current?.removeEventListener(
                "mousedown",
                mouseDownHandler
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDraw]);

    return { canvasRef, clearCanvas };
}
