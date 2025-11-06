import { PipelineProvider } from "./context/PipelineContext";
import Pipeline from "./components/Pipeline";

export default function Home() {
  return (
    <PipelineProvider>
      <Pipeline />
    </PipelineProvider>
  );
}
