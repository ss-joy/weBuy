export default function Sei() {
  async function tesst() {
    try {
      const resp = await fetch("http://localhost:3000/api/sax");
      const ressp = await resp.json();
      console.log(ressp);
    } catch (e) {
      console.log(e);
    }
  }
  function test() {
    tesst();
  }
  return (
    <div>
      <button
        onClick={() => {
          test();
        }}
      >
        click me
      </button>
    </div>
  );
}
