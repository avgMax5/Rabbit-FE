import { FundBunny } from '../_store/fundingStore';
import { FundBunnyDetail } from './fundingAPI';

export type { FundBunny };

export const dummyBunnies: FundBunny[] = [
    {
        fund_bunny_id: 'dummy-1',
        bunny_name: 'Space Rabbit',
        bunny_type: 'TECH',
        target_bny: 1000000,
        collected_bny: 750000,
        remaining_bny: 250000,
        created_at: '2024-01-15T10:00:00Z',
        end_at: '20:23:21'
    },
    {
        fund_bunny_id: 'dummy-2',
        bunny_name: 'Moon Bunny',
        bunny_type: 'GAME',
        target_bny: 500000,
        collected_bny: 300000,
        remaining_bny: 200000,
        created_at: '2024-01-20T09:00:00Z',
        end_at: '15:12:28'
    },
    {
        fund_bunny_id: 'dummy-3',
        bunny_name: 'Star Bunny',
        bunny_type: 'ART',
        target_bny: 800000,
        collected_bny: 600000,
        remaining_bny: 200000,
        created_at: '2024-01-25T14:30:00Z',
        end_at: '21:42:56'
    },
    {
        fund_bunny_id: 'dummy-4',
        bunny_name: 'Cosmic Rabbit',
        bunny_type: 'MUSIC',
        target_bny: 300000,
        collected_bny: 280000,
        remaining_bny: 20000,
        created_at: '2024-01-28T16:45:00Z',
        end_at: ''
    },
    {
        fund_bunny_id: 'dummy-5',
        bunny_name: 'Galaxy Bunny',
        bunny_type: 'EDUCATION',
        target_bny: 600000,
        collected_bny: 450000,
        remaining_bny: 150000,
        created_at: '2024-02-01T11:20:00Z',
        end_at: ''
    },
    {
        fund_bunny_id: 'dummy-6',
        bunny_name: 'Cyber Rabbit',
        bunny_type: 'TECH',
        target_bny: 1200000,
        collected_bny: 950000,
        remaining_bny: 250000,
        created_at: '2024-02-05T08:15:00Z',
        end_at: '18:45:12'
    },
    {
        fund_bunny_id: 'dummy-7',
        bunny_name: 'Pixel Bunny',
        bunny_type: 'GAME',
        target_bny: 400000,
        collected_bny: 120000,
        remaining_bny: 280000,
        created_at: '2024-02-08T13:30:00Z',
        end_at: '22:15:33'
    },
    {
        fund_bunny_id: 'dummy-8',
        bunny_name: 'Neon Rabbit',
        bunny_type: 'ART',
        target_bny: 700000,
        collected_bny: 700000,
        remaining_bny: 0,
        created_at: '2024-02-10T15:45:00Z',
        end_at: ''
    },
    {
        fund_bunny_id: 'dummy-9',
        bunny_name: 'Jazz Bunny',
        bunny_type: 'MUSIC',
        target_bny: 250000,
        collected_bny: 180000,
        remaining_bny: 70000,
        created_at: '2024-02-12T10:20:00Z',
        end_at: '19:30:45'
    },
    {
        fund_bunny_id: 'dummy-10',
        bunny_name: 'Study Rabbit',
        bunny_type: 'EDUCATION',
        target_bny: 900000,
        collected_bny: 650000,
        remaining_bny: 250000,
        created_at: '2024-02-15T09:00:00Z',
        end_at: '16:20:18'
    },
    {
        fund_bunny_id: 'dummy-11',
        bunny_name: 'Quantum Bunny',
        bunny_type: 'TECH',
        target_bny: 1500000,
        collected_bny: 200000,
        remaining_bny: 1300000,
        created_at: '2024-02-18T14:15:00Z',
        end_at: '23:55:07'
    },
    {
        fund_bunny_id: 'dummy-12',
        bunny_name: 'Retro Rabbit',
        bunny_type: 'GAME',
        target_bny: 350000,
        collected_bny: 350000,
        remaining_bny: 0,
        created_at: '2024-02-20T11:30:00Z',
        end_at: ''
    },
    {
        fund_bunny_id: 'dummy-13',
        bunny_name: 'Abstract Bunny',
        bunny_type: 'ART',
        target_bny: 550000,
        collected_bny: 420000,
        remaining_bny: 130000,
        created_at: '2024-02-22T16:00:00Z',
        end_at: '20:40:25'
    },
    {
        fund_bunny_id: 'dummy-14',
        bunny_name: 'Rock Rabbit',
        bunny_type: 'MUSIC',
        target_bny: 450000,
        collected_bny: 300000,
        remaining_bny: 150000,
        created_at: '2024-02-25T12:45:00Z',
        end_at: '17:15:42'
    },
    {
        fund_bunny_id: 'dummy-15',
        bunny_name: 'Smart Bunny',
        bunny_type: 'EDUCATION',
        target_bny: 800000,
        collected_bny: 750000,
        remaining_bny: 50000,
        created_at: '2024-02-28T08:30:00Z',
        end_at: '21:10:15'
    }
];

export const fundingCount = {
    listed_bunny_count: 15,
    now_funding_bunny_count: 8,
    ending_soon_bunny_count: 5,
}
