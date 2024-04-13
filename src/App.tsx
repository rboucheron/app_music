import Dropdown from "./component/Dropdown"
import { Option } from "./component/Dropdown"

function App() {
  const options: Array<Option> = [
    {
      value: 'option1',
      label: 'Option 1'
    },
    {
      value: 'option2',
      label: 'Option 2'
    },
    {
      value: 'option3',
      label: 'Option 3'
    }
  ]

  return (
    <>
      <Dropdown color="blue" options={options}>Salut</Dropdown>
    </>
  )
}

export default App;
