'use client'

import { FiMic } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";

const AskAI = () => {
	const suggestions = [
		"Why is my meter not working?",
		"How do I access my meter activities",
		"Why is my meter not working?",
	];

	return (
		<div className="w-full h-screen flex justify-center ">
			<div className="w-full max-w-2xl text-center p-4 gap-6">
				<h3 className="text-2xl md:text-5xl mb-30 ">What can i help you with?</h3>

				<div className=" bg-[var(--background-secondary)] shadow-xl rounded-2xl px-4 py-3 flex flex-col items-start gap-1 mb-6">
					<input
						type="text"
						placeholder="Ask Meta Ai"
						className="flex-1 outline-none pl-2 text-sm w-full py-4 "
					/>
					<div className="flex items-center justify-between w-full">
						<button className=" text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--background)] flex items-center justify-center rounded-full p-1 cursor-pointer">
							<FiPlusCircle />
						</button>

						<div className="flex items-center justify-between text-lg gap-3">
							<button className=" text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--background)] flex items-center justify-center rounded-full p-1 cursor-pointer">
								<FiMic />
							</button>
							<button className=" text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--background)] flex items-center justify-center rounded-full p-1 cursor-pointer">
								<IoMdSend />
							</button>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap gap-3 justify-center">
					{suggestions.map((text, idx) => (
						<button
							key={idx}
							className="px-4 py-1 text-sm rounded-full border-[0.5px] border-[var(--icon-color)] "
						>
							{text}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default AskAI;
