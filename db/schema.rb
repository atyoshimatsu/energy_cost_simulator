# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_15_114033) do

  create_table "companies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "estimates", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "ampere"
    t.integer "kVA"
    t.integer "kW"
    t.integer "power_factor"
    t.integer "year"
    t.integer "usage_jan"
    t.integer "usage_feb"
    t.integer "usage_mar"
    t.integer "usage_apr"
    t.integer "usage_may"
    t.integer "usage_jun"
    t.integer "usage_jul"
    t.integer "usage_aug"
    t.integer "usage_sep"
    t.integer "usage_oct"
    t.integer "usage_nov"
    t.integer "usage_dec"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "menus", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.integer "type"
    t.integer "area"
    t.float "EC"
    t.float "DC_other"
    t.float "DC_summer"
    t.integer "threshold_1"
    t.integer "threshold_2"
    t.integer "threshold_3"
    t.integer "threshold_4"
    t.integer "threshold_5"
    t.integer "power_factor_flag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
