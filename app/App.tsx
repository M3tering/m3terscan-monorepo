// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// 	Navigate,
// } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import Chart from "./m3ters/[m3terId]/charts/page";
// import Overview from "./m3ters/[m3terId]/overview/page";
// import Trades from "./m3ters/[m3terId]/trades/page";
// import Activity from "./m3ters/[m3terId]/activities/page";
// import AskAI from "./m3ters/[m3terId]/ask-ai/page";
// const Home = lazy(() => import("./components/Home"));
// const Loader = lazy(() => import("./components/Loader"));
// const Header = lazy(() => import("./components/Header"));
// const DashboardLayout = lazy(() => import("./m3ters/[m3terId]/layout"));

function App() {
	return (
		<>Hello World</>
		// 		<Router>
		// 			<Suspense fallback={<Loader />}>
		// 				<Header />
		// 				<main className="scroll-mt-16 md:scroll-mt-20 lg:scroll-mt-24">
		// 					<Routes>
		// 						<Route path="/" element={<Home />} />
		// 						<Route path="/meter/:meterId" element={<DashboardLayout />}>
		// 							<Route index element={<Navigate to="chart" replace />} />
		// 							<Route path="chart" element={<Chart />} />
		// 							<Route path="overview" element={<Overview />} />
		// 							<Route path="trades" element={<Trades />} />
		// 							<Route path="activity" element={<Activity />} />
		// 							<Route path="ask-ai" element={<AskAI />} />
		// 						</Route>
		// 					</Routes>
		// 				</main>
		// 			</Suspense>
		// 		</Router>
	);
}

export default App;

