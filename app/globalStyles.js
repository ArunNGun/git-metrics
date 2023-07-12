import styled from 'styled-components'

export const TableContainer = styled.div`
  overflow-x: auto;
  background-color: #212121;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-y: hidden;
  thead > tr {
   
  }
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #333333;
  }
`

export const TableHeader = styled.th`
color: #ffff;
font-weight: bold;
font-size: 15px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  text-align: left;
  padding: 16px 8px;
  border-bottom: 1px solid #444444;
`

export const TableCell = styled.td`
  text-align: left;
  padding: 12px 10px 8px;
  white-space: normal;
  color: #ffff;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  border-bottom: 1px solid #444444;
`

export const Banner = styled.div`
  width: 100%;
  border: 1px solid #f0b72f;
  border-radius: 6px;
  background-color: #2e2b25;
  padding: 16px;
  color: #ffff;
`
