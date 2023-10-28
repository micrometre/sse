import { NextPage } from "next";

const Page: NextPage = () => {
  const callSSE = () => {
    const eventSource = new EventSource(`/api/sse`);
    eventSource.addEventListener("myEventName", (e) => {
      // the event name here must be the same as in the API
      console.log(JSON.parse(e.data));
    });
    eventSource.addEventListener("open", (e) => {
      console.log("open", e);
    });
    eventSource.addEventListener("error", (e) => {
      eventSource.close();
    });
  };

  return (
    <div>
      <button onClick={callSSE}>GET SSE</button>
    </div>
  );
};

export default Page;