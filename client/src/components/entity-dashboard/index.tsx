import { useModal } from '@/hooks';
import { IEntityFormProps } from '@/types/entity-form';
import { Add } from '@mui/icons-material';
import { Box, IconButton, LinearProgress, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import DataTable from '../data-table';
import { IColumn } from '../data-table/data-table.interface';
import SectionHeader from '../section-header';
import { styles } from './styles';

type EntityDashboardProps<T> = {
  columns: IColumn<T>[];
  dataSource: T[];
  rowKey: keyof T;
  getAllRecordsLoading: boolean;
  title: string;
  description: string;
  emptyMessage: string;
  EntityForm: (props: IEntityFormProps) => JSX.Element;
  getAllRecords: () => void;
  onDeleteRecord: (record: T) => void;
  onEditRecord: (record: T) => void;
  resetRecords: () => void;
};

const EntityDashboard = <T,>(props: EntityDashboardProps<T>) => {
  const {
    EntityForm,
    title,
    description,
    rowKey,
    columns,
    emptyMessage,
    dataSource,
    getAllRecords,
    resetRecords,
    onDeleteRecord,
    getAllRecordsLoading,
    onEditRecord,
  } = props;

  const { isModalOpen, closeModal, openModal } = useModal();

  useEffect(() => {
    getAllRecords();

    return () => {
      resetRecords();
    };
  }, []);

  const handleDelete = (record: T) => {
    onDeleteRecord(record);
  };

  const handleEdit = (record: T) => {
    onEditRecord(record);
    openModal();
  };

  return (
    <>
      {getAllRecordsLoading ? <LinearProgress sx={styles.progress} /> : null}
      <Box sx={styles.dashboardWrapper}>
        <SectionHeader
          title={title}
          description={description}
          extra={
            <Tooltip title="Add new record">
              <IconButton onClick={openModal} color="secondary" size="large">
                <Add fontSize="medium" />
              </IconButton>
            </Tooltip>
          }
        />
        {dataSource && dataSource.length > 0 ? (
          <DataTable<T>
            dataSource={dataSource}
            columns={columns}
            rowKey={rowKey}
            onRow={{ onDelete: handleDelete, onEdit: handleEdit }}
          />
        ) : (
          emptyMessage
        )}
      </Box>
      <EntityForm open={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default EntityDashboard;
