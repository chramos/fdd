import Column from "components/column";
//@ts-ignore
import get from "lodash/get";
import React from "react";

type Columns<CData> = {
  header: React.ReactNode;
  dataKey: string;
  actions?: (data: CData, index: number) => React.ReactNode;
  cell?: (data: CData, index: number) => React.ReactNode;
  width?: string;
};

export interface TableProps<TData extends Object> {
  data: TData[];
  columns: Columns<TData>[];
  renderExpandedRow?: ({
    rowData,
    index,
  }: {
    rowData: TData;
    index: number;
  }) => React.ReactNode;
}

const Table = <T extends Object>({
  data,
  columns,
  renderExpandedRow,
}: TableProps<T>) => {
  const thClasses =
    "px-8 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  return (
    <Column className="w-full bg-white border-gray-200 border rounded-md">
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {renderExpandedRow ? <th className={thClasses}></th> : null}
            {columns.map((column, index) => (
              <th key={index} scope="col" className={thClasses}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            <React.Fragment>
              {data.map((rowData, rowIndex) => (
                <Tr
                  key={rowIndex}
                  rowIndex={rowIndex}
                  rowData={rowData}
                  columns={columns}
                />
              ))}
            </React.Fragment>
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-8 py-2 text-sm text-gray-500"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Column>
  );
};

export default Table;

type TrProps<T> = {
  rowIndex: number;
  rowData: T;
  columns: Columns<T>[];
};
const Tr = <T,>({ rowIndex, rowData, columns }: TrProps<T>) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <React.Fragment>
      <tr className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} `}>
        {columns.map((column, index) =>
          column.actions ? (
            <td
              key={index}
              className={`px-8 py-2 whitespace-nowrap text-sm text-gray-500 border-b border-transparent`}
            >
              <div className="min-h-[40px] items-center flex">
                {column.actions(rowData, rowIndex)}
              </div>
            </td>
          ) : (
            <td
              key={index}
              width={column?.width}
              className={`px-8 whitespace-nowrap text-sm text-gray-500 hover:cursor-default border-b ${
                expanded ? "border-gray-200" : "border-transparent"
              }`}
            >
              <div className="min-h-[40px] items-center flex relative">
                {column?.cell
                  ? column?.cell(rowData, rowIndex)
                  : get(rowData, column.dataKey, undefined)}
              </div>
            </td>
          )
        )}
      </tr>
    </React.Fragment>
  );
};
