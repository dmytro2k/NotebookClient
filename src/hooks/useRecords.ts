import { useState } from 'react';
import { axiosRequest } from '../api/axios';
import { useMutation } from '@tanstack/react-query';

type Record = {
  recordId: string;
  userId: string;
  recordNote: string;
  recordDate: Date;
  recordPosition: number;
};

type CreateRecordRequestProps = {
  userId: string;
  recordNote: string;
  recordDate: Date;
  recordPosition: number;
};

type DeleteRecordRequestProps = {
  userId: string;
  recordId: string;
};

type EditRecordRequestProps = {
  userId: string;
  recordId: string;
  recordNote: string;
};

type ChangeRecordPositionRequestProps = {
  userId: string;
  recordId: string;
  recordPosition: number;
  oldPosition: number;
};

type GetDateRecordsRequestProps = {
  userId: string;
  recordDate: Date;
};

type UseTodoReturnType = {
  records: Record[];
  createRecord: ({ userId, recordNote, recordDate, recordPosition }: CreateRecordRequestProps) => void;
  deleteRecord: ({ userId, recordId }: DeleteRecordRequestProps) => void;
  editRecord: ({ userId, recordId, recordNote }: EditRecordRequestProps) => void;
  changeRecordPosition: ({ userId, recordId, recordPosition, oldPosition }: ChangeRecordPositionRequestProps) => void;
  getDateRecords: ({ userId, recordDate }: GetDateRecordsRequestProps) => void;
};

export const useTodo = (): UseTodoReturnType => {
  const [records, setRecords] = useState<Record[]>([]);

  const { mutate: mutateCreateRecord } = useMutation({
    mutationFn: ({ userId, recordNote, recordDate, recordPosition }: CreateRecordRequestProps) =>
      createRecordRequest({ userId, recordNote, recordDate, recordPosition }),
    onSuccess: (data) => {
      setRecords((prev) =>
        [
          ...prev.filter((todo) => todo.recordPosition < data.recordPosition),
          data,
          ...prev
            .filter((todo) => todo.recordPosition >= data.recordPosition)
            .map((item) => {
              return { ...item, todoPosition: item.recordPosition + 1 };
            }),
        ].sort((first, second) => first.recordPosition - second.recordPosition)
      );
    },
    throwOnError: false,
  });

  const { mutate: mutateDeleteRecord } = useMutation({
    mutationFn: ({ userId, recordId }: DeleteRecordRequestProps) => deleteRecordRequest({ userId, recordId }),
    onSuccess: (data) => {
      setRecords((prev) =>
        [
          ...prev.filter((todo) => todo.recordPosition < data.recordPosition),
          ...prev
            .filter((todo) => todo.recordPosition >= data.recordPosition)
            .map((item) => {
              return { ...item, todoPosition: item.recordPosition - 1 };
            }),
        ].sort((first, second) => first.recordPosition - second.recordPosition)
      );
    },
    throwOnError: false,
  });

  const { mutate: mutateEditRecord } = useMutation({
    mutationFn: ({ userId, recordId, recordNote }: EditRecordRequestProps) => editRecordRequest({ userId, recordId, recordNote }),
    onSuccess: (data) => {
      setRecords((prev) => [...prev, data].sort((first, second) => first.recordPosition - second.recordPosition));
    },
    throwOnError: false,
  });

  const { mutate: mutateChangeRecordPosition } = useMutation({
    mutationFn: ({ userId, recordId, recordPosition, oldPosition }: ChangeRecordPositionRequestProps) =>
      changeRecordPositionRequest({ userId, recordId, recordPosition, oldPosition }),
    onSuccess: ({ response: data, oldPosition }) => {
      setRecords((prev) =>
        [
          ...prev.filter((todo) => todo.recordPosition < data.recordPosition),
          data,
          ...prev
            .filter((todo) =>
              oldPosition < data.recordPosition
                ? todo.recordPosition >= oldPosition && todo.recordPosition <= data.recordPosition
                : todo.recordPosition <= oldPosition && todo.recordPosition >= data.recordPosition
            )
            .map((item) => {
              return { ...item, todoPosition: oldPosition < data.recordPosition ? item.recordPosition - 1 : item.recordPosition + 1 };
            }),
        ].sort((first, second) => first.recordPosition - second.recordPosition)
      );
    },
    throwOnError: false,
  });

  const { mutate: mutateGetDateRecords } = useMutation({
    mutationFn: ({ userId, recordDate }: GetDateRecordsRequestProps) => getDateRecordsRequest({ userId, recordDate }),
    onSuccess: (data) => {
      setRecords(data);
    },
    throwOnError: false,
  });

  const createRecord = ({ userId, recordNote, recordDate, recordPosition }: CreateRecordRequestProps) => {
    mutateCreateRecord({ userId, recordNote, recordDate, recordPosition });
  };

  const deleteRecord = ({ userId, recordId }: DeleteRecordRequestProps) => {
    mutateDeleteRecord({ userId, recordId });
  };

  const editRecord = ({ userId, recordId, recordNote }: EditRecordRequestProps) => {
    mutateEditRecord({ userId, recordId, recordNote });
  };

  const changeRecordPosition = ({ userId, recordId, recordPosition, oldPosition }: ChangeRecordPositionRequestProps) => {
    mutateChangeRecordPosition({ userId, recordId, recordPosition, oldPosition });
  };

  const getDateRecords = ({ userId, recordDate }: GetDateRecordsRequestProps) => {
    mutateGetDateRecords({ userId, recordDate });
  };

  return { records, createRecord, deleteRecord, editRecord, changeRecordPosition, getDateRecords };
};

const createRecordRequest = async ({ userId, recordNote, recordDate, recordPosition }: CreateRecordRequestProps) => {
  const response = await axiosRequest<Record>({
    method: 'post',
    url: `/todos/`,
    data: { userId, recordNote, recordDate, recordPosition },
  });

  return response;
};

const deleteRecordRequest = async ({ userId, recordId }: DeleteRecordRequestProps) => {
  const response = await axiosRequest<Record>({
    method: 'delete',
    url: `/todos/`,
    data: { userId, recordId },
  });

  return response;
};

const editRecordRequest = async ({ userId, recordId, recordNote }: EditRecordRequestProps) => {
  const response = await axiosRequest<Record>({
    method: 'patch',
    url: `/todos/`,
    data: { userId, recordId, recordNote },
  });

  return response;
};

const changeRecordPositionRequest = async ({ userId, recordId, recordPosition, oldPosition }: ChangeRecordPositionRequestProps) => {
  const response = await axiosRequest<Record>({
    method: 'post',
    url: `/todos/move`,
    data: { userId, recordId, recordPosition },
  });

  return { response, oldPosition };
};

const getDateRecordsRequest = async ({ userId, recordDate }: GetDateRecordsRequestProps) => {
  const response = await axiosRequest<Record[]>({
    method: 'post',
    url: `/todos/date`,
    data: { userId, recordDate },
  });

  return response;
};
