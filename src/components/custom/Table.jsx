import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-4">
        <thead className="bg-[#F6F6F6]">
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup?.id} className="text-left">
              {headerGroup?.headers?.map((header) => (
                <th
                  key={header.id}
                  className="py-4 px-6 text-left text-xs font-medium text-main"
                >
                  {header?.isPlaceholder
                    ? null
                    : flexRender(
                        header?.column?.columnDef?.header,
                        header?.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getRowModel()?.rows?.map((row) => (
            <tr key={row?.id}>
              {row?.getVisibleCells()?.map((cell) => (
                <td
                  key={cell?.id}
                  className="py-3 px-6 text-xs font-medium text-main-grey whitespace-nowrap border-b border-gray-200"
                >
                  {flexRender(
                    cell?.column?.columnDef?.cell,
                    cell?.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
