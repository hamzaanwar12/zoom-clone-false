'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MeetingBoxCard from './MeetingBoxCard';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import ReactDatePicker from 'react-datepicker';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | null
  >(null);
  const [values, setValues] = useState(initialValues);
  const [callDetails, setCallDetails] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const handleCreateMeeting = async () => {
    if (!client || !user) {
      console.error('Missing fields');
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create call');

      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }

      const startsAt =
        values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: 'Meeting Created' });
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast({ title: 'Failed to create meeting' });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  const cards = [
    {
      title: 'New Meeting',
      subtitle: 'Start an instant meeting',
      iconSrc: '/icons/add-meeting.svg',
      bgColor: 'bg-box-orange',
      onClick: () => setMeetingState('isInstantMeeting'),
    },
    {
      title: 'Join Meeting',
      subtitle: 'Via invitation link',
      iconSrc: '/icons/join-meeting.svg',
      bgColor: 'bg-box-blue',
      onClick: () => setMeetingState('isJoiningMeeting'),
    },
    {
      title: 'Schedule Meeting',
      subtitle: 'Plan your meeting',
      iconSrc: '/icons/schedule.svg',
      bgColor: 'bg-box-purple',
      onClick: () => setMeetingState('isScheduleMeeting'),
    },
    {
      title: 'View Recordings',
      subtitle: 'Meeting recordings',
      iconSrc: '/icons/recordings.svg',
      bgColor: 'bg-box-yellow',
      onClick: () => router.push('/recordings'),
    },
  ];

  return (
    // <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <MeetingBoxCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          iconSrc={card.iconSrc}
          bgColor={card.bgColor}
          onClick={card.onClick}
        />
      ))}

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(null)}
          title="Create Meeting"
          handleClick={handleCreateMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(null)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(null)}
        title="Type the link here"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(null)}
        title="Start Instant Meeting"
        buttonText="Start Meeting"
        handleClick={handleCreateMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
