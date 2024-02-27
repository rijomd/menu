
type TypeStatus = { status: string, color: string };

export const getStatusColor = (value: any) => {
    const status: TypeStatus[] = [
        { status: 'Active', color: '#00e676' },
        { status: 'InActive', color: '#f44336' }
    ];
    const item = status.find(x => x.status === value);
    const color = item?.color || '#fff';
    return color;
}