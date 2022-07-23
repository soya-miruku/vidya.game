import { classNames } from "@/common/helpers";
import { useDetectIsMobileView } from "@/hooks/useDetectIsMobileView";
import { VText } from "./VText";

export interface IVTableColumn {
  label: string;
  fontSize?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
}

export interface IVTableData {
  [key: string]: any;
}

export interface IVTableProps {
  className?: string;
  columns: IVTableColumn[];
  data: IVTableData[];
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: "solid" | "dashed" | "dotted";
}

export const VTable = ({ columns, data, className, borderColor, borderWidth, borderStyle}: IVTableProps) => {
  const { isMobileView } = useDetectIsMobileView();
  return (
    <div className="w-full flex flex-col p-[0px] rounded-xl" style={{
      borderColor: borderColor ?? "rgb(124 58 237 / 0.5)",
      borderWidth: `${borderWidth ?? 2}px`,
      borderStyle: borderStyle ?? "solid",
    }}>
      <table className={classNames('table-auto rounded-xl dark:bg-dark-200 bg-light-200 w-full mobile:flex flex-col mobile:flex-row mobile:flex-no-wrap mobile:justify-center overflow-hidden mobile:gap-vsm', className)}>
        <thead className="dark:bg-dark-100 bg-light-300 p-vsm flex-auto sm:flex-none">
            {columns.map(({ fontSize, label, align }, i) => (
              <tr key={i} className="px-vsm py-vmd mobile:table-row table-cell">
                <th className={classNames('py-vsm whitespace-pre-wrap w-32', (align === 'center' && !isMobileView)  ? 'text-center' : (align === 'right' && !isMobileView) ? 'text-left' : 'text-left')}>
                  {typeof(label) === 'string' ? <VText size={fontSize || 'md'} className="uppercase !font-bold">{label}</VText> : label}
                </th>
              </tr>
            ))}
        </thead>
        <tbody className="flex-1 sm:flex-none p-vsm">
          {data.map((row, i) => (
            <tr key={i} >
              {columns.map(({ align }, j) => (
                <tr key={j} className="px-vsm py-vmd mobile:table-row table-cell !text-center">
                  <td className={classNames('py-vsm whitespace-pre-wrap w-32', (align === 'center' && !isMobileView) ? 'text-center' : (align === 'right' && !isMobileView) ? 'text-left' : 'text-left')}>
                    {typeof(row[j]) === 'string' ? <VText size="md">{row[j]}</VText> : row[j]}
                  </td>
                </tr>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}