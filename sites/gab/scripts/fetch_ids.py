#!/usr/bin/env python3
"""Fetch Google Drive IDs for all edited videos and make them publicly accessible."""
import subprocess
import json

# PUBLIC - Gab's travel/scenic footage (full-length, >1GB)
PUBLIC_VIDEOS = [
    {
        "title": "Mérida to Chichén Itzá",
        "location": "Mexico",
        "date": "December 2024",
        "type": "Scenic Drive",
        "path": "biz-drive:Davao/1 - To Process/2 - Low Priority/2024-12–11 - Mérida to Chitchen Itza to Leóna Vicario/Edited Files/2024-12–11 - Mérida to Chitchen Itza to Leóna Vicario.MOV",
    },
    {
        "title": "Slow TV — Biking in Canada",
        "location": "Charlevoix, Québec",
        "date": "September 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-09-29 & 30 - Charlevoix/Edited Files/Slow TV - Biking in Canada.mp4",
    },
    {
        "title": "Slow TV — Montréal 3",
        "location": "Montréal, Canada",
        "date": "September 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-09-12 - Montreal/Edited Files/Slow Tv Project 3.mp4",
    },
    {
        "title": "A Day in Québec",
        "location": "Charlevoix, Québec",
        "date": "October 2024",
        "type": "Scenic Drive",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-10-01 to 03 - A Day in Charlevoix/Edited Files/A Day in Quebec.mp4",
    },
    {
        "title": "Slow TV — Montréal 4",
        "location": "Montréal, Canada",
        "date": "September 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-09-12 - Montreal/Edited Files/Slow Tv Project 4.mp4",
    },
    {
        "title": "Tokyo Walking Tour 2",
        "location": "Tokyo, Japan",
        "date": "February 2025",
        "type": "Walking Tour",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2025/GAB'S STUFF 2025/2025-02-26 - Tokyo Walking Tour 2/Edited FIles/2025-02-26 - Tokyo Walking Tour 2.mp4",
    },
    {
        "title": "Slow TV — Montréal 5",
        "location": "Montréal, Canada",
        "date": "September 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-09-12 - Montreal/Edited Files/Slow Tv Project 5.mp4",
    },
    {
        "title": "Botanical Loop Trail",
        "location": "British Columbia",
        "date": "November 2024",
        "type": "Walking Tour",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024-11-24 - Botanical Loop Trail: A Scenic BC Hiking Experience | 4K ORIGINAL AUDIO/Edited Files/Botanical loop trail (Slowmo).mp4",
    },
    {
        "title": "Biking in Montréal 2",
        "location": "Montréal, Canada",
        "date": "September 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-09-20 - Montreal/Edited Files/Biking in Montreal 2.mp4",
    },
    {
        "title": "Bangkok After the Earthquake",
        "location": "Bangkok, Thailand",
        "date": "March 2025",
        "type": "Vlog",
        "path": "biz-drive:Davao/1 - To Process/2 - Low Priority/2025-03-28 - Bangkok after the earthquake. Everybody in the street/Edited Files/Bangkok after the earthquake. Everybody in the street. .mp4",
    },
    {
        "title": "A Day in Charlevoix 2",
        "location": "Charlevoix, Québec",
        "date": "October 2024",
        "type": "Scenic Drive",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-10-01 to 03 - A Day in Charlevoix/Edited Files/A Day in Charlevoix 2.mp4",
    },
    {
        "title": "Mystic Beach Hike",
        "location": "British Columbia",
        "date": "October 2024",
        "type": "Walking Tour",
        "path": "biz-drive:Davao/1 - To Process/2 - Low Priority/2024-10-23 - Hiking the Juan de Fuca Marine Trail in 4K | Mystic Beach, BC | MUSIC/Edited Files/Mystic.mp4",
    },
    {
        "title": "Slow TV — Montréal 6",
        "location": "Montréal, Canada",
        "date": "September 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-09-12 - Montreal/Edited Files/Slow TV Project 6.mp4",
    },
    {
        "title": "Jordan River Surf",
        "location": "British Columbia",
        "date": "October 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024-10-31 - Jordan River Campground/Edited Files/Jordan River - Surf.mp4",
    },
    {
        "title": "A Day in Charlevoix 3",
        "location": "Charlevoix, Québec",
        "date": "October 2024",
        "type": "Scenic Drive",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-10-01 to 03 - A Day in Charlevoix/Edited Files/A Day in Charlevoix 3.mp4",
    },
    {
        "title": "Bromont Ski Runs",
        "location": "Bromont, Québec",
        "date": "January 2025",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2025/GAB'S STUFF 2025/2025-01-07 - Bromont Ski Runs/Edited Files/Bromoth Ski Runs.mp4",
    },
    {
        "title": "Montréal Drive",
        "location": "Montréal, Canada",
        "date": "November 2024",
        "type": "Scenic Drive",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-11-27 - Montreal Drive/Edited Files/My Movie 1.MOV",
    },
    {
        "title": "Salt Surf — Khao Lak",
        "location": "Khao Lak, Thailand",
        "date": "March 2025",
        "type": "Slow TV",
        "path": "biz-drive:Davao/2 - Done/2025-03-17 - Salt Surf - Khao Lak/Edited Files/Salt Surf khao Lak.mp4",
    },
    {
        "title": "Woodview Mountain Top Skating",
        "location": "Blue Mountain, Ontario",
        "date": "February 2025",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2025/GAB'S STUFF 2025/2025-02-01 - Woodview Mountain Top/Edited Files/Woodview Mountain Top Skating - Blue Mountain.mp4",
    },
    {
        "title": "Biking in Montréal",
        "location": "Montréal, Canada",
        "date": "September 2024",
        "type": "Slow TV",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-09-19 - Montreal/Edited Files/1 - Biking to the streets of Montreal.mp4",
    },
]

# UNLISTED - Ali's content + personal vlogs
UNLISTED_VIDEOS = [
    {
        "title": "Charlevoix Vlog",
        "location": "Charlevoix, Québec",
        "date": "October 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/1 - To Process/2 - Low Priority/2024-10-05 - Almost drowned - Baie - Sainte - Catherine/Edited Files/2024-11-07 - Gab - Charlevoix.mp4",
    },
    {
        "title": "Almost Drowned",
        "location": "Charlevoix, Québec",
        "date": "October 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/1 - To Process/2 - Low Priority/2024-10-05 - Almost drowned - Baie - Sainte - Catherine/Edited Files/2024-11-08 - Almost Drowned.mp4",
    },
    {
        "title": "Vlog For Ali (Bday and Dogs)",
        "location": "Montréal, Canada",
        "date": "October 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/1 - To Process/2 - Low Priority/2024-10-03 - Ali's Vlog/Edited Files/2024-10-03 - Vlog For Ali (Bday and Dogs).mp4",
    },
    {
        "title": "Ali Vlog — Montréal to Stella",
        "location": "Montréal, Canada",
        "date": "October 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/1 - To Process/2 - Low Priority/2024-10-03 - Ali's Vlog/Edited Files/2024-10-03 - (Montreal - Stella).mp4",
    },
    {
        "title": "Ali Vlog — Montréal to BC",
        "location": "Canada",
        "date": "November 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024-11-07 - Ali's Vlogs/Edited Files/Montreal to BC.mp4",
    },
    {
        "title": "Ali Vlog 2",
        "location": "Canada",
        "date": "November 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024-11-07 - Ali's Vlogs/Edited Files/Ali Vlog 2(1).mp4",
    },
    {
        "title": "Ali Vlog 3",
        "location": "Canada",
        "date": "November 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024-11-07 - Ali's Vlogs/Edited Files/Ali Vlog 3.mp4",
    },
    {
        "title": "Ali Vlog 4",
        "location": "Canada",
        "date": "November 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024-11-07 - Ali's Vlogs/Edited Files/Ali Vlog 4.mp4",
    },
    {
        "title": "Mini Date Vlog",
        "location": "Montréal, Canada",
        "date": "November 2024",
        "type": "Vlog",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2024/GAB'S STUFF 2024/2024-11-20 - Mini Date Vlog - Ali ／ Gab Twitch/Edited Files/2024-11-20 - Vlog.mp4",
    },
    {
        "title": "Colombia Retreat Vlog",
        "location": "Colombia",
        "date": "March 2025",
        "type": "Vlog",
        "path": "biz-drive:Davao/3 - To Check Later/Video/2025/ALI's STUFF/2025-03-27 - Colombia Retreat Vlog/Edited Files/COLOMBIA RETREAT VLOG.mov",
    },
]

def get_drive_id(path):
    """Get the Google Drive file ID using rclone lsjson on the parent dir."""
    # Split into remote:dir and filename
    parts = path.rsplit("/", 1)
    if len(parts) != 2:
        return None
    parent_dir, filename = parts

    try:
        result = subprocess.run(
            ["rclone", "lsjson", parent_dir],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode != 0:
            print(f"  ERROR: rclone failed for {parent_dir}")
            return None

        files = json.loads(result.stdout)
        for f in files:
            if f["Name"] == filename:
                return {
                    "id": f["ID"],
                    "size_gb": round(f["Size"] / (1024**3), 1),
                }
        print(f"  WARNING: {filename} not found in {parent_dir}")
        return None
    except Exception as e:
        print(f"  ERROR: {e}")
        return None

def make_public(path):
    """Make a file publicly accessible via rclone link."""
    try:
        result = subprocess.run(
            ["rclone", "link", path],
            capture_output=True, text=True, timeout=30
        )
        return result.returncode == 0
    except:
        return False

def process_list(videos, label):
    results = []
    print(f"\n{'='*60}")
    print(f"  {label} ({len(videos)} videos)")
    print(f"{'='*60}\n")

    for i, v in enumerate(videos):
        print(f"[{i+1}/{len(videos)}] {v['title']}...")
        info = get_drive_id(v["path"])
        if info:
            v["drive_id"] = info["id"]
            v["size_gb"] = info["size_gb"]
            print(f"  ID: {info['id']} ({info['size_gb']} GB)")

            # Make public
            if make_public(v["path"]):
                print(f"  Made public")
            else:
                print(f"  WARNING: Could not make public")

            results.append(v)
        else:
            print(f"  SKIPPED (no ID found)")

    return results

if __name__ == "__main__":
    public = process_list(PUBLIC_VIDEOS, "PUBLIC")
    unlisted = process_list(UNLISTED_VIDEOS, "UNLISTED")

    # Save results
    output = {"public": public, "unlisted": unlisted}
    with open("scripts/footage_data.json", "w") as f:
        json.dump(output, f, indent=2)

    print(f"\n\nDone! {len(public)} public + {len(unlisted)} unlisted = {len(public)+len(unlisted)} total")
    print(f"Results saved to scripts/footage_data.json")
