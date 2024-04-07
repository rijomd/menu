
type TypeStatus = { status: string, color: string };

export const getStatusColor = (value: any) => {
    const status: TypeStatus[] = [
        { status: 'Active', color: '#00e676' },
        { status: 'InActive', color: '#f44336' },
        { status: 'Open', color: '#00e676' },
        { status: 'Cancelled', color: '#f4cf5e' },
        { status: 'Closed', color: '#f44336' },
        { status: 'Approved', color: 'green' },
    ];
    const item = status.find(x => x.status === value);
    const color = item?.color || '#fff';
    return color;
}