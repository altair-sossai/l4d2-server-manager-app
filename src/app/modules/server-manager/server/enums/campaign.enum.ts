export enum Campaign {
    c1m1_hotel = 'c1m1_hotel',
    c2m1_highway = 'c2m1_highway',
    c3m1_plankcountry = 'c3m1_plankcountry',
    c4m1_milltown_a = 'c4m1_milltown_a',
    c5m1_waterfront = 'c5m1_waterfront',
    c6m1_riverbank = 'c6m1_riverbank',
    c7m1_docks = 'c7m1_docks',
    c8m1_apartment = 'c8m1_apartment',
    c9m1_alleys = 'c9m1_alleys',
    c10m1_caves = 'c10m1_caves',
    c11m1_greenhouse = 'c11m1_greenhouse',
    c12m1_hilltop = 'c12m1_hilltop',
    c13m1_alpinecreek = 'c13m1_alpinecreek',
    c14m1_junkyard = 'c14m1_junkyard'
}

export const CampaignName = new Map<Campaign, string>([
    [Campaign.c1m1_hotel, 'Dead Center'],
    [Campaign.c2m1_highway, 'Dark Carnival'],
    [Campaign.c3m1_plankcountry, 'Swamp Fever'],
    [Campaign.c4m1_milltown_a, 'Hard Rain'],
    [Campaign.c5m1_waterfront, 'The Parish'],
    [Campaign.c6m1_riverbank, 'The Passing'],
    [Campaign.c7m1_docks, 'The Sacrifice'],
    [Campaign.c8m1_apartment, 'No Mercy'],
    [Campaign.c9m1_alleys, 'Crash Course'],
    [Campaign.c10m1_caves, 'Death Toll'],
    [Campaign.c11m1_greenhouse, 'Dead Air'],
    [Campaign.c12m1_hilltop, 'Blood Harvest'],
    [Campaign.c13m1_alpinecreek, 'Cold Stream'],
    [Campaign.c14m1_junkyard, 'The Last Stand'],
]);
