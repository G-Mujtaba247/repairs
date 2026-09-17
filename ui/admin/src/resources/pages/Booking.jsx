import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Bug, CalendarDays, Layers2, Mail, Mailbox, Pencil, Phone, Trash2, User } from 'lucide-react';
import axios from 'axios';
import { ALL_BOOKINGS, DELETE_BOOKING, UPDATE_BOOKING } from '@/resources/server_apis';
import moment from 'moment';
import { toast } from 'sonner';

export default function Booking() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedBookings, setSelectedBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(ALL_BOOKINGS);
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);

    // Handle select all checkboxes
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedBookings(bookings.map(booking => booking._id));
        } else {
            setSelectedBookings([]);
        }
    };

    // Handle individual checkbox
    const handleSelectBooking = (bookingId, checked) => {
        if (checked) {
            setSelectedBookings(prev => [...prev, bookingId]);
        } else {
            setSelectedBookings(prev => prev.filter(id => id !== bookingId));
        }
    };


    const handleBookingStatusChange = async (bookingId, status) => {
        setSelectedBooking((prev) => ({ ...prev, [bookingId]: status }));
        try {
            const response = await axios.patch(UPDATE_BOOKING, { bookingId, status });
            if (response.data.status == true) {
                toast.success(response.data.message);
                await fetchBookings();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Something went wrong");
        }
    }

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm("Are your sure you want to delete this booking?")) return; // gaurded clause
        try {
            const response = await axios.delete(`${DELETE_BOOKING}/${bookingId}`);
            if (response.data.status == true) {
                toast.success(response.data.message);
                await fetchBookings();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Something went wrong");
        }
    }

    const handleBulkDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedBookings.length} booking(s)?`)) return;

        try {
            const deletePromises = selectedBookings.map(bookingId =>
                axios.delete(`${DELETE_BOOKING}/${bookingId}`)
            );

            await Promise.all(deletePromises);

            toast.success(`Successfully deleted ${selectedBookings.length} booking(s)`);
            setSelectedBookings([]);
            await fetchBookings();
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Failed to delete some bookings");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Booking Page</h2>
                <p className="text-muted-foreground">Manage the content of your Booking page.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Booking List</CardTitle>
                                <CardDescription>Manage the booking list.</CardDescription>
                            </div>
                            {selectedBookings.length > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handleBulkDelete}
                                    className="gap-2 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 hover:border-red-400"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete ({selectedBookings.length})
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40px]">
                                        <Checkbox
                                            checked={bookings.length > 0 && selectedBookings.length === bookings.length}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-[30px]">ID</TableHead>
                                    <TableHead className="w-[30px]">&nbsp;</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>User Details</TableHead>
                                    <TableHead>Appliance Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    bookings.length > 0 ?
                                        bookings.map((booking, index) => (
                                            <TableRow>
                                                <TableCell className="font-medium">
                                                    <Checkbox
                                                        checked={selectedBookings.includes(booking._id)}
                                                        onCheckedChange={(checked) => handleSelectBooking(booking._id, checked)}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell className="font-medium">
                                                    <Trash2 onClick={() => handleDeleteBooking(booking._id)} className="cursor-pointer w-5 h-5 hover:text-red-500" />
                                                </TableCell>
                                                <TableCell className='w-[150px]'>
                                                    <Select onValueChange={(e) => handleBookingStatusChange(booking._id, e)} value={booking.status}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="pending">Pending</SelectItem>
                                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                                <SelectItem value="processing">Processing</SelectItem>
                                                                <SelectItem value="completed">Completed</SelectItem>
                                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="w-[350px]">
                                                    <div className='bg-gray-100 p-2 rounded'>
                                                        <p className='font-bold text-lg'> <User className='inline -mt-1' /> {booking.firstName + " " + booking.lastName}</p>
                                                        <div className='mt-3'>
                                                            <p className='text-gray-600'> <Mail size={16} className='inline -mt-1 ml-1 mr-3' />{booking.email}</p>
                                                            <p className='text-gray-600'> <Phone size={16} className='inline -mt-1 ml-1 mr-3' />{booking.phone}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className='bg-gray-100 p-2 rounded'>
                                                        <div className='flex items-center justify-between gap-2'>
                                                            <p className='font-bold text-lg capitalize'> <Layers2 className='inline -mt-1' /> {booking.category}</p>
                                                            <p className='bg-white p-1 text-xs font-bold rounded text-purple-600'>
                                                                <CalendarDays className='h-4 w-4 inline -mt-1 ml-1 mr-1' /> {booking.createdAt && moment(booking.createdAt).format('llll')}
                                                            </p>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <p className='text-gray-600'> <Bug size={16} className='inline -mt-1 ml-1 mr-3' />{booking.issue}</p>
                                                            <p className='text-gray-600 flex items-start gap-2'> <div><Mailbox size={16} className='mt-1 ml-1' /></div>
                                                                <span className='block'>
                                                                    {booking.message}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No bookings found.
                                            </TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


