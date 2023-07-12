import UserIcon from "../icons/UserIcon"

const Header =()=>{
 return (
    <div style={{ background: '#272b33', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid  #7a828e' }}>
          <div>
            <h1 style={{color:"#ffff", fontSize:'2.1rem'}}>
              Git<span id="hub-heading">hub</span> Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px', backgroundColor: 'currentcolor', borderRadius: '10px', border: '1px solid rgb(122, 130, 142)' }}>
            <div style={{ width: '16px', height: '16px' }}>
              <UserIcon />
              </div>
          <h3 style={{color:'#f0b72f'}}>
              ArunNgun
            </h3>
          </div>
        </div>
 )
}

export default Header