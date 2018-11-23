import React from 'react'
import styled from 'styled-components'

const ClickableTableHeader = React.lazy(() => import('_tables/ClickableTableHeader'))
const Table = React.lazy(() => import('_tables/Table'))
const TableHeader = React.lazy(() => import('_tables/TableHeader'))
const TableCell = React.lazy(() => import('_tables/TableCell'))

// Delete this component
const TableScreen = () => {
  return (
    <React.Suspense fallback={<div/>}>
      <Table>
        <thead>
          <tr>
            <React.Suspense fallback={<th>Header 1</th>}>
              <TableHeader>Header 1</TableHeader>
            </React.Suspense>
            <React.Suspense fallback={<th>Sortable Header 2</th>}>
              <ClickableTableHeader
                title="Sortable Header 2"
                onClick={handleHeader2Change}/>
            </React.Suspense>
            <React.Suspense fallback={<th>Header 3</th>}>
              <TableHeader>Header 3</TableHeader>
            </React.Suspense>
          </tr>
        </thead>
        <tbody>
          <tr>
            <React.Suspense fallback={<td>Body 1A</td>}>
              <TableCell>Body 1A</TableCell>
            </React.Suspense>
            <React.Suspense fallback={<td>Body 2A</td>}>
              <TableCell>Body 2A</TableCell>
            </React.Suspense>
            <React.Suspense fallback={<td>Body 3A</td>}>
              <TableCell>Body 3A</TableCell>
            </React.Suspense>
          </tr>
          <tr>
            <React.Suspense fallback={<td>Body 1B</td>}>
              <TableCell>Body 1B</TableCell>
            </React.Suspense>
            <React.Suspense fallback={<td>Body 2B</td>}>
              <TableCell>Body 2B</TableCell>
            </React.Suspense>
            <React.Suspense fallback={<td>Body 3B</td>}>
              <TableCell>Body 3B</TableCell>
            </React.Suspense>
          </tr>
        </tbody>
      </Table>
    </React.Suspense>
  )
}

function handleHeader2Change() {
  alert("handleHeader2Change")
}

export default TableScreen