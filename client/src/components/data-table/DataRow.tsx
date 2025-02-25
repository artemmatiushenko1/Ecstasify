import {
  TableRowProps,
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVertRounded } from '@mui/icons-material';
import { IColumn } from './data-table.interface';
import { styles } from './styles';
import { useMenuPopover } from '@/hooks';

interface IDataRowProps<T> {
  row: T;
  columns: IColumn<T>[];
  onDelete?: (row: T) => void;
  onEdit?: (row: T) => void;
  MuiRowProps?: TableRowProps;
}

const DataRow = <T,>({
  row,
  columns,
  MuiRowProps,
  onDelete,
  onEdit,
}: IDataRowProps<T>) => {
  const { open, closeMenu, openMenu, anchorEl } = useMenuPopover();

  const handleRowDelete = () => {
    onDelete?.(row);
    closeMenu();
  };

  const handleRowEdit = () => {
    onEdit?.(row);
    closeMenu();
  };

  const menuItems = [
    { label: 'Delete', onClick: handleRowDelete },
    { label: 'Edit', onClick: handleRowEdit },
  ];

  return (
    <TableRow hover sx={styles.rowWrapper} {...MuiRowProps}>
      {columns.map(({ key, dataIndex, render }) => {
        const renderValue = render
          ? render(row[dataIndex])
          : (row[dataIndex] as React.ReactNode);

        return (
          <TableCell key={key} sx={styles.rowCell}>
            {renderValue}
          </TableCell>
        );
      })}
      <TableCell align="right">
        <IconButton onClick={openMenu}>
          <MoreVertRounded color="primary" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
          {menuItems.map(({ onClick, label }) => (
            <MenuItem key={label} onClick={onClick}>
              {label}
            </MenuItem>
          ))}
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default DataRow;
