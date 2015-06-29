class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user
  before_save :build_url

  def build_url
    self.title.gsub(/\s/,'-')
  end

  def as_json(options = {})
    super(options.merge(include: [:user, comments: {include: :user}]))
  end
end
