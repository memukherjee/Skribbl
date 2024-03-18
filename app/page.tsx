"use client";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Canvas from "@/app/components/Canvas";

export default function Home() {
    const [color, setColor] = useState("#121212");

    return (
        <main className="w-full h-screen flex justify-between px-8 py-4">
            <div className="score-panel">
                <h1 className="text-4xl font-bold">Skribbl-1.0</h1>
                <p className="text-xl">A simple drawing game</p>
                <div className="user">
                    <p className="text-xl">User: Guest</p>
                    <p className="text-xl">Score: 0</p>
                </div>
                <p className="selected-color">
                    Color:
                    <span
                        style={{
                            display: "inline-block",
                            width: "12px",
                            height: "12px",
                            backgroundColor: color,
                            margin: "0 10px",
                        }}
                    ></span>
                    {color}
                </p>
                <HexColorPicker color={color} onChange={setColor} />
            </div>
            <Canvas color={color} />
            <div className="chat-panel border-2 border-black p-2 flex flex-col">
                <div className="chat grow">
                    <h2>Chat</h2>
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Enter chat message" />
                    <button>Send</button>
                </div>
            </div>
        </main>
    );
}
