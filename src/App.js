import { useCallback } from "react";
import { useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import Card from "./components/Card";
import ClearButton from "./components/ClearButton";
import Header from "./components/Header";
import HeaderMemo from "./components/HeaderMemo";
import TaxComp from "./components/TaxComp";
import UseRefComp from "./components/UseRefComp";

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  /* const taxData = {"tax":0.18,"ship":15} */
  const taxData = useRef({"tax":0.18,"ship":15})

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data)
      })
  }, [])

  /* const filteredData = data?.filter(item=> item.name.toLowerCase().includes(search.toLowerCase())) */

  const filteredData = useMemo(() => {
   return data?.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
  },[data,search])

  const handleSearch = ()=>{
    setSearch(text)
  }

 /*  const handleClear = () => {
    setText("")
    setSearch("")
  } */

  const handleClear = useCallback(() => {
    setText("")
    setSearch("")
  }, [])

  return (
    <div className="container mt-2">
      <div>
        <Header count={count<5 ? 0 : count} />
        <hr />
        <HeaderMemo count={count<5 ? 0 : count} />
      </div>
      <hr />
      <TaxComp taxData={taxData}/>
      <div>
        <p>{count}</p>
        <button className='btn btn-danger' onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input type='text' value={text} onChange={({target}) => setText(target.value)} />
        <button type='button' onClick={handleSearch}>Search</button>
      </div>
      <div className="row">
        <Card data={filteredData} />
      </div>
      <hr />
      <ClearButton handleClear={handleClear}/>
      <br /><br />
      <hr />
      <h1>useRef</h1>
      <UseRefComp/>
      <br /><br /><br />
    </div>
  );
}

export default App;

//stateler her de??i??ti??inde component render olaca???? i??in alt componentler de yeniden olu??turulur. bunu ??nlemenin yolu react memo kullanmak. memo bize sadece ilgili componente g??nderilen de??er de??i??ti??inde sard?????? componenti tekrar render ettirir. faydas??z kald?????? yer object tipli verilerdir. onu engellemenin yolu da useMemo kullanmak 

//useMemo
// Shallow comparison???da e??er kar????la??t??r??lan tipler nesne (Object) ise i??erisindeki de??erleri de??il referans de??erleri kar????la??t??r??l??r. E??er kar????la??t??r??lan nesneler memory???de ayn?? adresi g??steriyorsa true g??stermiyorsa false olarak de??er d??nd??r??r.

// Input alan??na bir de??er girdi??imiz zaman App.js tekrar render edildi??i i??in filteredData tekrar olu??ur. filteredData tekrardan olu??tu??u i??in Card componentine g??ndermi?? oldu??umuz data her seferinde farkl?? bir adrese sahip olur. Bu y??zdende React.memo Card componentine ilk seferde g??ndermi?? oldu??umuz data array???inin tutuldu??u adres ile render edildikten sonra gelen data array???inin farkl?? adreste bulundu??unu g??rd?????? i??in CArd componentini tekrar render eder. Props olarak verdi??imiz array de??i??medi??i halde Card componentinin render edilmesini engelleyebilmek i??in useMemo kullanabiliriz.
